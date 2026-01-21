// custom middleware
// errorhandler, request logger, unknown endpoint
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")
const User = require("../model/user")

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError") {
        response.status(400).json({"error" : error.message})
    }else if (error.name === "CastError"){
        response.status(400).send({"error" : "malformatted id"})
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        response.status(400).json({ error: 'expected `username` to be unique' })
    }else if (error.name === "JsonWebTokenError"){
        response.status(401).json({ error: 'Invalid Token' })
    }else if (error.name === "TokenExpiredError"){
        response.status(401).json({ error: 'Token Expired' })
    }
    response.status(500).json({ error: 'Internal Server Error' })

    next(error)
}


const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")

  if (authorization && authorization.startsWith("Bearer")){
    const Extractedtoken =  authorization.replace("Bearer ", "")
    // do not send the token as it will end the request
    // route will never run .post() if so
    // Middleware = ingredients prepping:
    // Extracts ingredients (token)
    // Puts them on the counter (request object)
    // Says "ready for the chef!" (calls next())

    // Route handler = chef:
    // Takes the ingredients (request.token)
    // Cooks the dish (creates blog)
    // Serves it (response.json())
    request.token = Extractedtoken
  }
  next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id){
        return response.status(401).send({error: "User ID not Found"})
    }
    request.user = await User.findById(decodedToken.id)
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('----------')
    next()
}

const unknownEndPoint = (request, response) => {
    response.status(404).send({error :"Unknown Endpoint"})
}

module.exports = {errorHandler, requestLogger, unknownEndPoint, tokenExtractor, userExtractor}