//Mongoose Schema

const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

// connection url
const url = process.env.PHONEDB

mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log("Connected to Blog MongoDB")
    })
    .catch(error => {
        console.log("error connecting to Blog MongoDB:", error.message)
    })

const blogSchema = new mongoose.Schema({

    name: {
        type: "String",
        minLength: 3,
        required: true
    },
    number: {
        type: "String",
        minLength: [8, "Phone number should be 8 or more digits"],
        validate: {
            validator: function(v) {
                return /\d{2}-/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
})

// format data output
phoneSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// export default {} but model style
// model name Note => collection name notes (small caps + plural)
module.exports = mongoose.model("Contact", phoneSchema)
// model = constructor compiled
// document = instance of a model (obj). contains data fields
// collection = group of documents (students, teachers)