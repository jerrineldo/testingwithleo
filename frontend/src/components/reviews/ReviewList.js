import React, { useState, useEffect } from "react";
import ReviewDataService from "../services/reviews.js";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const ReviewList = (props) => {
  const [reviewsList, setreviewsList] = useState([]);
  const [reviews, setReviews] = useState([]);

  const retrieveReviews = () => {
    console.log("Jerrin");
    ReviewDataService.getAllSeminarstoReview()
      .then((response) => {
        console.log(response.data);
        setreviewsList(response.data);
        console.log(reviewsList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //console.log('object :>> ', object);

  useEffect(() => {
    retrieveReviews();
  }, []);

  const retrieveReviewById = (id) => {
    return ReviewDataService.getReviewById(id)
     .then((response) => {
       console.log("Review:",response.data);
       //setReviews(response.data);
       return response;
     })
     .catch((e) => {
       console.log(e);
     });
     
 };

 
  console.log("jerrin", reviewsList);

  var results = [];
  var tempresults = [];
  const renderReviews = (seminar) => {
    return seminar.reviews.length
      ?
       (
         <div>
         {
           seminar.reviews.map((reviewid) =>
           {
               const review = retrieveReviewById(reviewid);
               //review.then(console.log(review));
               //debugger;
               //debugger;
               
               console.log('ret :>> ', review.then(response => {
                 //console.log(JSON.stringify(response));
                 //const reviewretrieved = JSON.stringify(response);
                 console.log("jerrinhere:",response.data);
                 tempresults.push( response.data);
                 //setReviews(response.data);
                 //return response.data;
                 console.log("Jacobs here",tempresults[1]['comment']);
                 
               }).catch((e) => {console.log(e);}));

               console.log("Jacobs here again",tempresults);
               //debugger



               return <li>{
                
                 }</li>
               
               //return ;
               // debugger;
               //return res;
           })
         }
         </div>
         
        )
      : (
          <div>No Reviews Yet</div>
        );
  };

   console.log("leo",tempresults);
  return (
    <>
      <Header />
      <main>
        <h1> Reviews list</h1>
        <div className="row">
          {reviewsList.map((seminar) => {
            return (
              <div className="col-lg-4 pb-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Title: {seminar.title}</h5>
                    <p className="card-text">
                      <strong>Content: </strong>
                      {seminar.content}
                      <br />
                      <strong>Reviews :</strong>
                      {
                      renderReviews(seminar)
                      }

                    </p>
                    <div className="row">
                      <Link
                        to={"/seminar/"}
                        className="btn btn-primary col-lg-5 mx-1 mb-1"
                      >
                        View Reviews
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReviewList;
