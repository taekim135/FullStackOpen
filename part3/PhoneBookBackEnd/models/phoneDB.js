const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// connection url
const url = process.env.PHONEDB

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('Connected to Phone MongoDB')
  })
  .catch(error => {
    console.log('error connecting to Phone MongoDB:', error.message)
  })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// format data output
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export default {} but model style
// model name Note => collection name notes (small caps + plural)
module.exports = mongoose.model('Contact', phoneSchema)
// model = constructor compiled
// document = instance of a model (obj). contains data fields
// collection = group of documents (students, teachers)