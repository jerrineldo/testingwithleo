/* This is the data access layer to the Topics entity. It instantiates the connection to the database with the injectDB method, and holds any additional methods that modify or read from the database */
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let topics

export default class TopicsDAO{
    static async injectDB(conn){
        console.log("running topics connection")
        /* If a connection to the topics entity already exists exit the method */
        if (topics){
            return
        }

        /* if no connection exists, try connecting - go into the webinars_database entity and select the "topics" collection/entity/object  */
        try{
            topics = await conn.db(process.env.WEBINARS_NS).collection("topics")
        }
        catch(e){
            console.error(`Unable to establish connection to the topics collection: ${e}`)
        }
    }

    static async getTopics(){
        /* 'topics' is the connection to the collection 'topics' in the db */
        try{
            var cursor = await topics.find()
        }

        catch(e){
            console.error(`Unable to execute db statement - check parameters, ${e}`)
            return {error : e}
        }

        try{
            var topicsList = cursor.toArray()
            return topicsList
        }

        catch(e){
            console.error(`Unable to convert cursor to array, ${e}`)
            return topicsList=[]
        }
    }

    static async getTopicsById(id){
        try{
            /* Grab id parameter from request and use to create new mongodb id object */
            var getTopic = {
                _id: new ObjectId(id)
            } 

            var foundTopic = await topics.find({
                _id: new ObjectId(id)
            })
            console.log("found topic:" + foundTopic)
        }

        catch(e){
            console.error(`Unable to execute db statement - check parameters, ${e}`)
            return{error:e}
        }

        try{
            var Topic = foundTopic.toArray()
            return Topic
        }

        catch(e){
            console.error(`Unable to convert result topic from cursor to obeject`)
            return {error:e}
        }
    }
    static async addTopic(Topic){
        try{
            /* Make the object from parameters sent by user */
            const NewTopic = { 
                topic_name: Topic.name,
                topic_desc: Topic.desc,
            }
            console.log("New topic to be added: "+NewTopic)
            /* Send the object to the database */
            return await topics.insertOne(NewTopic)
        }
        catch(e){
            console.error(`Unable to post topic: ${e}`)
            return {error : e}
        }
    }

    static async updateTopic(UpdatedTopic){
        console.log("ERROR" + UpdatedTopic)
        try{
            const Topic = {
                _id: UpdatedTopic.topicId,
                topic_name: UpdatedTopic.name,
                topic_desc: UpdatedTopic.description,
            }
            
            const result = await topics.updateOne(
                {_id:ObjectId(UpdatedTopic.topicId)}, 
                {$set:{topic_name: UpdatedTopic.name, topic_desc: UpdatedTopic.description}}
            )

            return result
        }

        catch(e){
            console.error(`Unable to execute db statement for updateTopic - check parameters, ${e}`)
            return {error:e}
        }
    }
   
    static async deleteTopic(topicId /* userId later */){
        try{
            const result = await topics.deleteOne({_id:ObjectId(topicId)})
            return result
        }

        catch(e){
            console.error(`Unable to execute db statement for deleteTopic - check parameters, ${e}`)
            return {error:e}
        }
    }
} 