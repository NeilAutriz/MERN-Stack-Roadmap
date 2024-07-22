const express = require('express');
const Goal = require('../model/goalModel');

// @desc    Obtain all of the goals
// @route   GET /api/goals
const getGoals = async (req, res, next) => {
    const goals = await Goal.find();
    if(!goals){
        const error = new Error('No goals is added yet.')
        error.status = 401;
        next(error);
    }
    res.status(201).json(goals);
}

// @desc    Create the goals
// @route   POST /api/goals
const createGoals = async (req, res, next) => {
    if(!req.body.title || !req.body.content || !req.body.author){
        const error = new Error('Complete the required fields to create new goal.')
        error.status = 401;
        next(error);
    }

    const duplicateGoal = await Goal.findOne({_id: req.body.id}).exec();
    if(duplicateGoal){
        const error = new Error(`Duplicated Goal id is detected.`);
        error.status(401);
        next(error);
    }

    const createdGoal = await Goal.create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })

    res.status(201).json({createdGoal});
}

// @desc    Edit the goals
// @route   PUT /api/goals/:id
const editGoals = async (req, res, next) => {
    if(!req.body.title || !req.body.content || !req.body.author){
        const error = new Error('Complete the required fields to edit.');
        error.status = 401;
        next(error);
    }

    if(!req.params.id) { 
        const error = new Error('Id is required to find the goal to be editted.');
        error.status = 401;
        next(error);
    }

    const foundGoal = await Goal.findOne({_id: req.params.id}).exec();
    if(!foundGoal){
        const error = new Error(`Goal id ${req.params.id} does not exist.`);
        error.status = 401;
        next(error);
    }

    foundGoal.title = req.body.title;
    foundGoal.content = req.body.content;
    foundGoal.author = req.body.author;
    const result = await foundGoal.save();

    res.status(201).json({result});
}

//@desc     Delete the goals
// @route   DELETE /api/goals/:id
const deleteGoals = async (req, res, next) => {
    if(!req.params.id) { 
        const error = new Error('Id is required to find the goal to be deleted.');
        error.status = 401;
        next(error);
    }

    const deleteGoal = await Goal.findOne({_id: req.params.id}).exec();
    if(!deleteGoal){
        const error = new Error(`Goal id ${req.params.id} does not exist.`);
        error.status = 401;
        next(error);
    }

    const deleted = await Goal.deleteOne(deleteGoal);
    console.log('Successfully deleted the goal.');
    res.status(200).json({deleted});
}

module.exports = {getGoals, createGoals, editGoals, deleteGoals}; 