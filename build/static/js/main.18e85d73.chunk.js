(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},23:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(16),o=t.n(c),u=(t(23),t(6)),l=t(17),i=t(2),m=t(4),s=t.n(m),d="/api/persons",h=function(e){var n=e.message,t=e.isErrorMessage;return n?r.a.createElement("h4",{className:t?"notification error":"notification success"},n):null},f=function(e){var n=e.searchTerm,t=e.handleChangeSearchTerm;return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",null,"Filter shown with",r.a.createElement("input",{value:n,onChange:t})))},b=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement("div",null,"".concat(n.name," ").concat(n.number),r.a.createElement("button",{onClick:function(){return t(n)}},"delete"))},v=function(e){var n=e.persons,t=e.searchTerm,a=e.handleDelete,c=n.filter((function(e){return e.name.toLowerCase().includes(t.trim().toLowerCase())}));return r.a.createElement("div",null,c.map((function(e){return r.a.createElement(b,{key:e.id,person:e,handleDelete:a})})))},E=function(e){var n=e.name,t=e.number,a=e.handleSubmit,c=e.handleChangeSetName,o=e.handleChangeSetNumber;return r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:n,onChange:c})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},p=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),m=Object(i.a)(o,2),b=m[0],p=m[1],g=Object(a.useState)(""),S=Object(i.a)(g,2),j=S[0],O=S[1],w=Object(a.useState)(""),C=Object(i.a)(w,2),k=C[0],D=C[1],T=Object(a.useState)({message:null,isError:!1}),N=Object(i.a)(T,2),y=N[0],M=N[1];Object(a.useEffect)((function(){s.a.get(d).then((function(e){return e.data})).then((function(e){c(e)}))}),[]);var A=function(e,n){M({message:e,isError:n}),setTimeout((function(){M({message:null,isError:!1})}),5e3)},I=function(e,n){var a;(a={name:e,number:n},s.a.post(d,a).then((function(e){return e.data}))).then((function(e){c([].concat(Object(l.a)(t),[e])),A("Added ".concat(e.name))})).catch((function(e){var n=e.response.data.error;A(n,!0),console.log(n)})),L()},J=function(e,n,a){var r;window.confirm("".concat(e," is already added to phonebook, replace the old number with a new one?"))&&((r=Object(u.a)(Object(u.a)({},a),{},{number:n}),s.a.put("".concat(d,"/").concat(r.id),r).then((function(e){return e.data}))).then((function(e){c(t.map((function(n){return n.id===e.id?e:n})))})).catch((function(e){var n=e.response.data.error;console.log(n),A(n,!0)})),L())},L=function(){p(""),O("")},P=function(e){return t.find((function(n){return n.name===e}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(h,{message:y.message,isErrorMessage:y.isError}),r.a.createElement(f,{searchTerm:k,handleChangeSearchTerm:function(e){D(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(E,{name:b,number:j,handleSubmit:function(e){e.preventDefault();var n=b.trim(),t=j.trim(),a=P(n);(n<1||t.length<1)&&A("Please input valid name and phone number",!0),!a&&t.length&&I(n,t),a&&t.length&&J(n,t,a)},handleChangeSetName:function(e){p(e.target.value)},handleChangeSetNumber:function(e){O(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(v,{persons:t,searchTerm:k,handleDelete:function(e){var n;window.confirm("Delete ".concat(e.name))&&(n=e.id,s.a.delete("".concat(d,"/").concat(n)).then((function(e){return e.data}))).then((function(n){A("Deleted ".concat(e.name," from the server"),!1),c(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){A("Information of ".concat(e.name," has already been removed from server"),!0),c(t.filter((function(n){return n.id!==e.id})))}))}}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.18e85d73.chunk.js.map