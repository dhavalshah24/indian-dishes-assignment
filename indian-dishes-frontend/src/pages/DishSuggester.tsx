import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import axios from "axios";
import { Dish } from "../components/interfaces";
import "../components/styles.css";

const DishSuggester: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [possibleDishes, setPossibleDishes] = useState<Dish[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/ingredients"
        );
        setAllIngredients(response.data.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientChange = (
    event: React.SyntheticEvent,
    value: string[]
  ) => {
    setSelectedIngredients(value);
  };

  useEffect(() => {
    const fetchPossibleDishes = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/dishes/possible",
          {
            ingredients: selectedIngredients,
          }
        );
        setPossibleDishes(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching possible dishes:", error);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    };

    if (selectedIngredients.length > 0) {
      fetchPossibleDishes();
    } else {
      setPossibleDishes([]);
    }
  }, [selectedIngredients]);

  return (
    <div className="dish-suggester">
      <Autocomplete
        multiple
        options={allIngredients}
        value={selectedIngredients}
        onChange={handleIngredientChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Select Ingredients" />
        )}
      />
      {possibleDishes.length > 0 && <h4>You can make the following dishes:</h4>}
      <ul>
        {possibleDishes.length > 0 ? (
          possibleDishes.map((dish, index) => <li key={index}>{dish.name}</li>)
        ) : (
          <p>No Dishes Found</p>
        )}
      </ul>
    </div>
  );
};

export default DishSuggester;
