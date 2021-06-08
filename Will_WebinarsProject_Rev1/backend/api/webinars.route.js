/* This file dictates what happens when someone routes to the restaurants api = what is the request and how is it handled? */
import express from "express"
import TopicsCtrl from "./topics.controller.js"

const router = express.Router()

/* Get all topics */
router.route("/topics").get(TopicsCtrl.apiGetTopics)
/* Get topics by id */
router.route("/topics/id/:id").get(TopicsCtrl.apiGetTopicsById)


/* Routes CUD Requests to /topic */
router
    .route("/topics")
    .post(TopicsCtrl.apiPostTopic)
    .put(TopicsCtrl.apiUpdateTopic)
    .delete(TopicsCtrl.apiDeleteTopic)

export default router
