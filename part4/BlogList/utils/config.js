// The handling of environment variables (exported for other files to use)
// no direct access to process.env for security


require("dotenv").config()

const mongoUrl = process.env.NODE_ENV === "test"
    ? process.env.TEST_DBURL
    : process.env.DBURL
    
const PORT = process.env.PORT 

module.exports = {mongoUrl, PORT}