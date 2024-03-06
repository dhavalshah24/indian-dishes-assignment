import React from "react";
import "./styles.css";
import { Dish } from "./interfaces";

const DishDetails: React.FC<{ dish: Dish }> = ({ dish }) => {
  return (
    <div className="dish-details">
      <h2>{dish.name}</h2>
      <div className="details">
        <p>
          <strong>Ingredients:</strong> {dish.ingredients}
        </p>
        <p>
          <strong>Diet:</strong> {dish.diet}
        </p>
        <p>
          <strong>Preparation Time:</strong>{" "}
          {dish.prep_time ? `${dish.prep_time} min` : "-"}
        </p>
        <p>
          <strong>Cooking Time:</strong>{" "}
          {dish.cook_time ? `${dish.cook_time} min` : "-"}
        </p>
        <p>
          <strong>Flavor Profile:</strong>{" "}
          {dish.flavor_profile ? dish.flavor_profile : "-"}
        </p>
        <p>
          <strong>Course:</strong> {dish.course}
        </p>
        <p>
          <strong>State:</strong> {dish.state ? dish.state : "-"}
        </p>
        <p>
          <strong>Region:</strong> {dish.region ? dish.region : "-"}
        </p>
      </div>
    </div>
  );
};

export default DishDetails;
