import TopicsDAO from "../dao/topicsDAO.js"

export default class TopicsController {
    static async apiGetTopics(req, res){
        try{
        /* Create object to send to data access layer */
        const TopicsList = await TopicsDAO.getTopics()
        console.log("Returned from database: "+TopicsList)
        res.json(TopicsList)
        }
        catch(e){
            console.error(`api, ${e}`)
        }
    }
    static async apiGetTopicsById(req, res){
        /* Expecting a parameter of 'id' to be sent in the url. Grab it. */
        try{ 
            let id = req.params.id || {} /* If none was entered leave id empty object */
            const Topic = await TopicsDAO.getTopicsById(id)
            /* If that id did not return an object, return 404 error */
            if(!Topic){
                res.status(404).json({error:"not found"})
                return
            }
            console.log(Topic[0])
            res.json(Topic[0])
        }
        /* If alternate error occurs */
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
    static async apiPostTopic (req, res) {
        try{
            /* Create topic object from user parameters */
            const Topic = {
                name:req.body.topic_name,
                desc:req.body.topic_desc
            }

            /* Send to data access layer */
            const response = await TopicsDAO.addTopic(Topic)
            res.json({status:"success"})
            console.log(response)
        }

        /* If unable to connect to DAO */
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
    static async apiUpdateTopic (req, res){
        try{
             /* Create updated object  */
            const UpdatedTopic = {
                topicId:req.body._id,
                name:req.body.topic_name,
                description:req.body.topic_desc
            }

            /*  Send to data access layer  */
            const response = await TopicsDAO.updateTopic(UpdatedTopic)
            res.json({status:"success"})
            console.log(response)
        }
        catch(e){
            res.status(500).json({error:e})
            console.log(`api, ${e}`)
        }
    }

    static async apiDeleteTopic (req, res){
        try{
            /* Get the user id and the topic id from body and query respectively  */
            const topicId = req.query.id
/*             const userId = req.body.user_id
 */
            const response = await TopicsDAO.deleteTopic(topicId /* userId later*/)
            res.json({status:"success"})
        }
        
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
}