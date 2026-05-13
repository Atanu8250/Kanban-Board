const express = require('express');
const { createTask, updateTask, deleteTask, generateDescriptionForTask, createTaskFromPrompt } = require('../controllers/task.controller');
const consumeAiUsage = require('../middlewares/aiUsage.middleware');
const consumeAiUsagePerMinute = require('../middlewares/aiMinuteUsage.middleware');
const taskRouter = express.Router();

// ! Generate task description using Gemini AI by passing task title in req-body
taskRouter.post('/generate-description', consumeAiUsagePerMinute, consumeAiUsage, generateDescriptionForTask)

// ! Create task from natural language prompt using Gemini AI
taskRouter.post('/create-from-prompt/:id', consumeAiUsagePerMinute, consumeAiUsage, createTaskFromPrompt)

// ! Pass the board's id in param's of the URL to add task in it
taskRouter.post("/:id", createTask)

// ! Update specific Task by passing the id of the task in the URL param and the changes in the req-body
taskRouter.patch('/:id', updateTask)

// ! Delete specific Task by passing the id of the task in the URL param and 'boardId' key in req-body
taskRouter.delete('/:id', deleteTask)



module.exports = taskRouter;