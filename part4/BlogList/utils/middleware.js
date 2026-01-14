// custom middleware
// errorhandler, request logger, unknown endpoint
const logger = require("../utils/logger")

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError") {
        response.status(400).json({"error" : error.message})
    }else if (error.name === "CastError"){
        response.status(400).send({"error" : "malformatted id"})
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        response.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
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

module.exports = {errorHandler, requestLogger, unknownEndPoint}