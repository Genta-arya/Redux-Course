import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectProducts } from "./productlist/fitur/productSlice";

const Rating = ({ productId }) => {
  const products = useSelector(selectProducts);

  const product = products.find((p) => p.id === productId);

  if (!product || !product.rating) {
    return null;
  }

  const { rate, count } = product.rating;

  const stars = [];
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
    );
  }

  if (halfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStar}
        className="text-yellow-500 half"
      />
    );
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {stars.length > 0 ? (
          <>
            {stars.map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </>
        ) : (
          <span className="text-gray-500">No reviews</span>
        )}
      </div>
      <span className="ml-1 text-gray-500">({count} reviews)</span>
    </div>
  );
};

export default Rating;
