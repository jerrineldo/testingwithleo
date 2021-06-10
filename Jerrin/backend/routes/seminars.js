const router = require("express").Router();
let Seminar = require("../models/oldseminars.model.js");

router.route("/").get((req, res) => {
    Seminar.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;