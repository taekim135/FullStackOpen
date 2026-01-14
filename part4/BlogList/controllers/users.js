// api routes for user data
const User = require("../model/user")
const userRouter = require("express").Router()
const bcrypt = require("bcrypt")


// create new user to DB
userRouter.post("/", async (request,response) => {
    const {username, name, password} = request.body

    const salt = 10;
    const hashedPW = await bcrypt.hash(password, salt)

    const user = new User({
        "username": username,
        "name": name,
        "passwordHash" : hashedPW
    })

    const savedUser = await user.save()
    
    response.status(201).json(savedUser)
})
