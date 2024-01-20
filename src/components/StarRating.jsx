import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const StarRating = ({ rating }) => {
  if (!rating) return null;
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div>
      {[...Array(fullStars)].map((star, index) => (
        <FontAwesomeIcon key={index} icon={solidStar} className="checked" />
      ))}
      {[...Array(halfStars)].map((star, index) => (
        <FontAwesomeIcon key={index} icon={halfStar} className="checked" />
      ))}
      {[...Array(emptyStars)].map((star, index) => (
        <FontAwesomeIcon key={index} icon={regularStar} className="checked" />
      ))}
    </div>
  );
};

export default StarRating;
