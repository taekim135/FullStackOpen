const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/user")
const loginRouter = require("express").Router()



loginRouter.post("/", async (request, response) => {
    const {username, password} = request.body

    // check if user exists in DB
    const user = await User.findOne({username})

    // if user is null (DNE) then false, otherwise check if pw entered is correct
    const correctPW = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && correctPW)){
        response.status(401).json({error: "incorrect username or password"})
    }


    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60*60 })

    response.status(200).send({token, username: user.username, name: user.name})
})


module.exports = loginRouter