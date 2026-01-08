//Mongoose Schema

const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

// format data output
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// export default {} but model style
// model name Note => collection name notes (small caps + plural)
module.exports = mongoose.model("Blogs", blogSchema)
// model = constructor compiled
// document = instance of a model (obj). contains data fields
// collection = group of documents (students, teachers)