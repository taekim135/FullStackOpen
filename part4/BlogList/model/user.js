const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    'username': {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    'name': String,
    'passwordHash': String
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id

        // WE DO NOT EXPOSE PW WHEN WORKING WITH API CALLS & RESPONSE DATA
        // ONLY STORE THEM IN DB
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User