const express = require('express');
const { createTask, updateTask, deleteTask, generateDescriptionForTask } = require('../controllers/task.controller');
const taskRouter = express.Router();

// ! Generate task description using Gemini AI by passing task title in req-body
taskRouter.post('/generate-description', generateDescriptionForTask)

// ! Pass the board's id in param's of the URL to add task in it
taskRouter.post("/:id", createTask)

// ! Update specific Task by passing the id of the task in the URL param and the changes in the req-body
taskRouter.patch('/:id', updateTask)

// ! Delete specific Task by passing the id of the task in the URL param and 'boardId' key in req-body
taskRouter.delete('/:id', deleteTask)



module.exports = taskRouter;