import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" /* Allows us to use our environment variables from our env file*/
import TopicsDAO from "./dao/topicsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.WEBINARS_DB_URI,
    {
        poolSize:50,
        wtimeout: 2500,
        useNewUrlParse: true
    }
)

.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})

.then(async client => {
    await TopicsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})