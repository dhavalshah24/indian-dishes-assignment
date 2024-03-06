const express = require('express');
const dishesRoutes = require('./dishes');
const ingredientsRoutes = require('./ingredients');

const router = express.Router();

router.use('/dishes', dishesRoutes);
router.use('/ingredients', ingredientsRoutes);

module.exports = router;
