const mongoose = require("mongoose")
require("dotenv").config()

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

//const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length >= 5) {
  person.save().then(result => {
    console.log("person saved!")
    mongoose.connection.close()
  })
} else {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)

    })
    mongoose.connection.close()
  })
}
