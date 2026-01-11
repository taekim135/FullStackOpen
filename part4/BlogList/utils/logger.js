// all log printing controlled here
// no more stright up console.log -> all sent here

const info = (...params) => {
    if (process.env.NODE_ENV !== "test"){
        console.log(...params)
    }
}
    

const error = (...params) => {
    if (process.env.NODE_ENV !== "test"){
        console.error(...params)
    }
}

module.exports = {info, error}