// node index.js if separate - npm run start if with dist
require("dotenv").config()

const express = require("express") // import express library
const morgan = require("morgan") // HTTP request logger middleware for node.js
const app = express() // express application instance (object)
const Phone = require("./models/phoneDB")

app.use(express.json()) // allows auto parsing of json @ incoming request - Content-Type: application/json
app.use(express.static("dist")) //grab static files from frontend

// token = placeholder
// Define what :body should be replaced with
morgan.token("body", (request) => {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const errorHandler = (error, request,response,next) => {
    console.log(error.message)

    if (error.name === "CastError"){
        response.status(400).send({ error: "malformatted id" })
    }else if(error.name === "ValidationError"){
        response.status(400).send({error: error.message})
    }
    next(error)
}


app.get("/api/persons", (request,response) => {
    Phone.find({}).then(contacts => {
        response.json(contacts)
    })
})


app.get("/api/persons/:id",(request,response) => {
    Phone.findById(request.params.id)
        .then(result => {
            return result ? response.json(result) : response.status(404).end()
        })
})


app.get("/api/info", (request,response) => {
    const timeStamp = new Date().toString()

    Phone.countDocuments({})
        .then(result => {
            return result ? response.send(`
                    <p> Phonebook has info for ${result} people </p>
                    <p> ${timeStamp} </p>
                `)
                : response.status(404).end()
        })
})


app.delete("/api/persons/:id", (request,response, next) => {
    Phone.findByIdAndDelete(request.params.id)
        .then(() => {
            // 204 = success but no data to send back
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post("/api/persons", (request, response,next) => {
    const details = request.body

    if (!details || details.number === "" || details.name === "") {
        return response.status(400).json({
            "error": "Missing fields"
        }).end()
    }


    Phone.find({name: details.name}).then(duplicate => {
        if (duplicate.length > 0){
            console.log("duplicate found")
            return response.status(400).json({ "error": "Contact already exists"}).end()
        }

        const newContact = new Phone({
            name: details.name,
            number: details.number
        })

        return newContact.save().then(savedContact => {
            console.log("new contact added to DB")
            response.json(savedContact)
        })
    }).catch(error => next(error))
})


app.put("/api/persons/:id", (request,response, next) => {
    const {number} = request.body

    Phone.findById(request.params.id)
        .then(contact => {
            if(!contact){
                console.log("Contact not found in DB")
                return response.status(404).end()
            }

            contact.number = number

            contact.save().then(savedNote => {
                console.log("Contact updated")
                response.send(savedNote)
            })
        })
        .catch(error => next(error))
})

app.use(errorHandler)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})