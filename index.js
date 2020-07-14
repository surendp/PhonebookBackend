require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ')
})

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(logger)
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Phonebook api</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      const meta = `<div>Phonebook has info for ${persons.length} people<div>`
      const newDate = `<div>${new Date()}</div>`
      response.send(`${meta} ${newDate}`)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  // const personExists = persons.find(person => person.name === name)

  if (!(name && number)) {
    return response.status(400).send({ error: 'Please provide valid name and number'})
  }

/*   if (personExists) {
    return response.status(400).send({ error: 'The name already exists in the Phone book'})
  }
 */

  const person = new Person({
    name,
    number,
  })

  person.save()
    .then(person => {
      response.status(201).send(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request
  const person = {
    name: body.name,
    number: body.number,
  }

  const opts = {
    new: true,
    runValidators: true,
  }

  Person.findByIdAndUpdate(request.params.id, person, opts)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})