// The handling of environment variables 

require("dotenv").config()

const mongoUrl = process.env.NODE_ENV === "test"
    ? process.env.TEST_DBURL
    : process.env.DBURL
    
const PORT = process.env.PORT 

module.exports = {mongoUrl, PORT}