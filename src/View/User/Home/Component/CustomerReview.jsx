import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import "../../../../style/custome.css";
import ReviewForm from "./FormReview";

const customerReviews = [
  {
    id: 1,
    name: "Rina Susanti",
    rating: 5,
    comment:
      "Very satisfied with purchasing clothes at HKKS! The product quality is good, the models are contemporary, and the customer service is friendly. Thank you HKKS!",
  },
  {
    id: 2,
    name: "Gentha Arya",
    rating: 4,
    comment:
      "There are many choices of Fashion Products available at HKKS, but it is possible to add size variations. Customer service is very good and responsive. I like!",
  },
  {
    id: 3,
    name: "Tegar Tri",
    rating: 5,
    comment:
      "The product I bought at HKKS exceeded my expectations. Not only does it look good, but it is also durable. I highly recommend this shop!",
  },
];

function CustomerReviews() {
  const [reviews, setReviews] = useState(customerReviews);

  const addReview = (newReview) => {
    const newId = reviews.length + 1;
    const updatedReviews = [...reviews, { ...newReview, id: newId }];
    setReviews(updatedReviews);
    console.log(updatedReviews);
  };

  const getStarIcons = (rating, username) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? solidStar : regularStar;
      const starClass = i <= rating ? "text-yellow-500" : "text-gray-300";
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={starIcon}
          className={`mr-1 text-xl ${starClass}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto mt-24 lg:p-12 md:p-12 p-4">
      <h2 className=" lg:text-3xl md:text-2xl text-md font-bold mb-10 text-center text-white bg-black w-72 rounded-full p-2">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-300 p-4 rounded-3xl shadow-2xl drop-shadow-2xl hover:scale-90 transition-all delay-75 shine"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-white">
                  {review.rating}
                </span>
              </div>
              <div className="ml-2">
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <div className="text-gray-600">
                  {getStarIcons(review.rating, review.name)}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
      <ReviewForm onSubmitReview={addReview} />
    </div>
  );
}

export default CustomerReviews;
