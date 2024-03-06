import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Dish, DishesList as HeaderProps } from "./interfaces";
import { useNavigate } from "react-router-dom";

const Header: React.FC<HeaderProps> = ({ dishes }) => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const filterOptions = (
    options: Dish[],
    { inputValue }: { inputValue: string }
  ) => {
    const searchTextLower = inputValue.toLowerCase().trim();
    return options.filter((dish) => {
      const dishName = dish.name.toLowerCase().trim();
      const ingredientsLower = dish.ingredients
        .split(", ")
        .map((ingredient) => ingredient.toLowerCase());
      const stateLower = dish.state?.toLowerCase() || "";
      const regionLower = dish.region?.toLowerCase() || "";
      return (
        dishName.startsWith(searchTextLower) ||
        ingredientsLower.some((ingredient) =>
          ingredient.startsWith(searchTextLower)
        ) ||
        stateLower.startsWith(searchTextLower) ||
        regionLower.startsWith(searchTextLower)
      );
    });
  };

  const handleOptionClick = (
    event: React.SyntheticEvent,
    value: Dish | string | null
  ) => {
    // Handle navigation to the dish details page
    if (value && typeof value !== "string")
      navigate(`/dish/${encodeURIComponent(value.name)}`);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Autocomplete
        freeSolo
        options={dishes}
        getOptionLabel={(dish) => (typeof dish === "string" ? dish : dish.name)}
        inputValue={searchText}
        onInputChange={(event, value) => setSearchText(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
        filterOptions={filterOptions}
        onChange={(event, value) => handleOptionClick(event, value)}
      />
    </div>
  );
};

export default Header;
