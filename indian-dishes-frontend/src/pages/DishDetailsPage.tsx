import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DishDetails from "../components/DishDetails";
import axios from "axios";

const DishDetailsPage: React.FC = () => {
  const { dishName } = useParams<{ dishName: string }>();
  const [dishDetails, setDishDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/dishes/${dishName}`
        );
        setDishDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching dish details:", error);
      }
    };

    fetchDishDetails();
  }, [dishName]);

  return (
    <div>
      <h2>Dish Details</h2>
      {dishDetails ? (
        <DishDetails dish={dishDetails} />
      ) : (
        <p>Loading dish details...</p>
      )}
    </div>
  );
};

export default DishDetailsPage;
