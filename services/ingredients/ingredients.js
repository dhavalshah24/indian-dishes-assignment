const fs = require('fs');
const path = require('path');

const dishesFilePath = path.join(__dirname, '../../data/dishes.json');
const dishesData = JSON.parse(fs.readFileSync(dishesFilePath, 'utf8'));

const getAllIngredients = () => {
  const ingredients = new Set();
  dishesData.forEach((dish) => {
    const eachDishIngredients = dish.ingredients.split(', ');
    eachDishIngredients.forEach((ingredient) => {
      ingredients.add(ingredient.toLowerCase().trim());
    })
  });
  return Array.from(ingredients);
}

module.exports = {
  getAllIngredients,
}