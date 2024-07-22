const express = require('express');

const goalsRouter = express.Router();

//Importing the controllers
const {getGoals, createGoals, deleteGoals, editGoals} = require('../controllers/goalController');

goalsRouter.route('/').get(getGoals).post(createGoals)

goalsRouter.route('/:id').put(editGoals).delete(deleteGoals)

module.exports = goalsRouter;