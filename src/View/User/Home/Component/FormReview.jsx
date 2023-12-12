import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";


import CustomAlert from "./CustomeAlert";
function ReviewForm({ onSubmitReview }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [name, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length > 15) {
      showAlertMessage("Name must be at most 15 characters.");
      return;
    }

    if (newReview.trim().length > 100) {
      showAlertMessage("Review must be at most 100 characters.");
      return;
    }

    if (newReview.trim() !== "" && name.trim() !== "" && rating !== 0) {
      const reviewData = {
        name,
        rating,
        comment: newReview,
      };
      setReviews([...reviews, reviewData]);
      setNewReview("");
      setUsername("");
      setRating(0);
      onSubmitReview(reviewData);
    }
  };

  const handleInputChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="border-2 border-gray-200 lg:p-12 md:p-12 p-4 rounded-xl mt-12">
      <h2 className="text-xl font-semibold mb-4 mt-12 ">Comment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <div className="mb-4 w-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={handleUsernameChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating:
          </label>
          <Rating
            count={5}
            size={30}
            value={rating}
            onChange={handleRatingChange}
            edit={true}
            isHalf={false}
            activeColor="#FCD34D"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Review:
          </label>
          <textarea
            rows="4"
            cols="50"
            id="review"
            placeholder="Write your review here..."
            value={newReview}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="w-full text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-500"
          >
            Submit Review
          </button>
        </div>
      </form>

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default ReviewForm;
