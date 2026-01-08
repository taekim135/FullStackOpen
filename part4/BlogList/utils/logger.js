// all log printing controlled here
// no more stright up console.log -> all sent here

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {info, error}