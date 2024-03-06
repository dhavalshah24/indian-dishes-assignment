const fs = require('fs');
const path = require('path');

const dishesFilePath = path.join(__dirname, '../../data/dishes.json');
const dishesData = JSON.parse(fs.readFileSync(dishesFilePath, 'utf8'));

const getAllDishes = () => {
  return dishesData;
};

const getDishByName = (dishName) => {
  const dish = dishesData.find(d => d.name.toLowerCase() === dishName.toLowerCase());
  return dish
};

const getPossibleDishes = (ingredients) => {
  ingredients = ingredients.map((ingredient) => ingredient.trim().toLowerCase());
  const possibleDishes = dishesData.filter(dish => {
    const dishIngredients = dish.ingredients.split(', ').map(ingredient => ingredient.trim().toLowerCase());
    return dishIngredients.every(ingredient => ingredients.includes(ingredient));
  });
  return possibleDishes;
};

module.exports = {
  getAllDishes,
  getDishByName,
  getPossibleDishes,
};