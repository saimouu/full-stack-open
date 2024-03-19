const express = require("express")
const app = express()
require("dotenv").config()

const Person = require("./models/person")

app.use(express.static("dist"))

const morgan = require("morgan")
const cors = require("cors")

app.use(cors())
app.use(express.json())

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name == "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get("/info", (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
      <br>${Date()}`)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
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

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    number: body.number,
    name: body.name
  }
  //console.log(request.params.id)
  //console.log(body.number)
  Person.findByIdAndUpdate(
    request.params.id, 
    person, 
    { new: true, runValidators: true, context: "query" }
  )
    .then(updatedPerson => {
      //console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
