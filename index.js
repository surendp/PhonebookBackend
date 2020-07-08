const express = require('express')
const morgan = require('morgan')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
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
}))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5325325",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-64-23122",
    id: 4
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Phonebook api</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const meta = `<div>Phonebook has info for ${persons.length} people<div>`
  const newDate = `<div>${new Date()}</div>`

  response.send(`${meta} ${newDate}`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body
  const personExists = persons.find(person => person.name === name)

  if (!(name && number)) {
    return response.status(400).send({ error: 'Please provide valid name and number'})
  }

  if (personExists) {
    return response.status(400).send({ error: 'The name already exists in the Phone book'})
  }

  const id = Math.floor(Math.random() * 1000000000)
  persons = [...persons, { name, number , id }]
  return response.status(201).end()
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})