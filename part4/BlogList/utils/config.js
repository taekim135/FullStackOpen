// The handling of environment variables 

require("dotenv").config()

const mongoUrl = process.env.DBURL
const PORT = process.env.PORT 

module.exports = {mongoUrl, PORT}