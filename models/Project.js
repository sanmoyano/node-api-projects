const { Schema, model } = require('mongoose')

// schema
const projectSchema = new Schema({
  title: String,
  description: String,
  image: String
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// model
const Project = model('Project', projectSchema)

module.exports = Project
