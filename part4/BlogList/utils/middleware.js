// custom middleware
// errorhandler, request logger, unknown endpoint
const logger = require("../utils/logger")

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError") {
        response.status(400).json({"error" : error.message})
    }
    if (error.name === "CastError"){
        response.status(400).send({"error" : "malformatted id"})
    }
    next(error)
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownPoint = (request, response) => {
    response.status(404).send({error :"Unknown Endpoint"})
}

module.exports = {errorHandler, requestLogger, unknownPoint}