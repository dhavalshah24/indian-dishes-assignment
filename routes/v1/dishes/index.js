const express = require('express');
const dishes = require('../../../services/dishes/dishes');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const allDishes = dishes.getAllDishes();

    return res.status(200).send({
      success: true,
      data: allDishes,
      message: "Dishes fetched successfully"
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }

});

router.get('/:dishName', (req, res) => {
  const dishName = req.params.dishName;

  if (!dishName || dishName.trim() === '') {
    return res.status(400).send({ success: false, message: "Missing parameters" });
  }

  try {
    const dish = dishes.getDishByName(dishName);

    if (!dish) {
      return res.status(404).send({ success: false, message: "Dish not found" });
    }
    return res.status(200).send({
      success: true,
      data: dish,
      message: "Dish fetched successfully"
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }

});

router.post('/possible', (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).send({ success: false, message: "Invalid ingredients provided" });
  }

  const possibleDishes = dishes.getPossibleDishes(ingredients);

  if (possibleDishes.length === 0) {
    return res.status(404).send({ success: false, message: "No dishes found with provided ingredients" });
  }
  return res.status(200).send({
    success: true,
    data: possibleDishes,
    message: "Possibe dishes fetched successfully"
  });
});

module.exports = router;
