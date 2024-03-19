const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log("connected to mongodb")
  })
  .catch((error) => {
    console.log("error connecting to mongodb", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        return  /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid number`
    }
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id  
    delete returnedObject.__v
  } 
})

module.exports = mongoose.model("Person", personSchema)