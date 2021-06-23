import http from "../http.common";
//import {MongoClient} from "mongodb";
class ReviewDataService {
  getAllSeminarstoReview() {
    return http.get(`/reviewseminars`);
  }

  getReviewById(id){
    return http.get(`/review/`+id);
  }
  // getOldSeminars() {
  //   var MongoClient = require("mongodb").MongoClient;
  //   var url = "http://localhost:5000/";

  //   MongoClient.connect(url, function (err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("webinars_database");
  //     var d = new Date();
  //     var query = { date:{$lt:d} };
  //     dbo
  //       .collection("reviews")
  //       .find(query)
  //       .toArray(function (err, result) {
  //         if (err) throw err;
  //         console.log(result);
  //         db.close();
  //       });
  //   });
  // }
}

export default new ReviewDataService();
