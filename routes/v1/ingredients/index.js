const express = require('express');
const ingredients = require('../../../services/ingredients/ingredients');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const allIngredients = ingredients.getAllIngredients();

    return res.status(200).send({
      success: true,
      data: allIngredients,
      message: "Ingredients fetched successfully"
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
})

module.exports = router;
