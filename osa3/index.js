const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(express.json())

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.use(cors())

let persons = [
  { 
  "name": "Arto Hellas", 
  "number": "040-123456",
  "id": 1
  },
  { 
  "name": "Ada Lovelace", 
  "number": "39-44-5323523",
  "id": 2
  },
  { 
  "name": "Dan Abramov", 
  "number": "12-43-234345",
  "id": 3
  },
  { 
  "name": "Mary Poppendieck", 
  "number": "39-23-6423122",
  "id": 4
  }
]

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/info", (request, response) => {
  const count = persons.length
  response.send(`<p>Phonebook has info for ${count} people</p>
    <br>${Date()}`)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  //console.log(id)
  const person = persons.find(person => person.id === id)
  //console.log(person)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

const generateId = (max) => Math.floor(Math.random() * max)

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const names = persons.map(person => person.name)
  if (names.includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(1000000),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
