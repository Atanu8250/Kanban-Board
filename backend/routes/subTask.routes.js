const express = require("express");
const { createSubTask, updateSubTask, deleteSubTask } = require("../controllers/subTask.controller");

const subTaskRouter = express.Router();

// ! Pass the task's id in which we need to add the subtasks
subTaskRouter.post("/:id", createSubTask)

// ! Pass a single subTask's id to change it or update it
subTaskRouter.patch("/:id", updateSubTask)

subTaskRouter.delete("/:id", deleteSubTask)

module.exports = subTaskRouter;