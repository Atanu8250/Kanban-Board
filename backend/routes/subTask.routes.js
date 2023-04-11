const express = require("express");
const TaskModel = require("../models/task.model");
const SubTaskModel = require("../models/subTask.model");

const subTaskRouter = express.Router();


// ! Pass the task's id in which we need to add the subtasks
subTaskRouter.post("/:id", async (req, res) => {
     const subtasks = req.body;
     const taskId = req.params.id;
     try {
          const task = await TaskModel.findById(taskId);

          // if the subtask is not comming in an array format then making it an array;
          if (subtasks.length === undefined) subtasks = [req.body];

          // storing all the subtask's ids;
          let subTaskIds = [];
          try {
               subTaskIds = await Promise.all(subtasks.map(async e => {
                    const newSubTask = new SubTaskModel({ title: e })
                    await newSubTask.save();
                    return newSubTask._id;
               }))
          } catch (error) {
               console.log('error in subtask creation:', error)
               res.status(500).send({ mesesage: error.message, error });
               return;
          }

          /**
           * adding all the subtask's id in the specific
           * task's subtask key to maintain the relationship
           */
          task.subtask = [...task.subtask, ...subTaskIds];
          await task.save();

          res.status(201).send(`New SubTask created Successfully in ${task.title} task`);
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
})


// ! Pass a single subTask's id to change it or update it
subTaskRouter.patch("/:id", async (req, res) => {
     const subTaskId = req.params.id;
     const updates = req.body;
     try {
          await SubTaskModel.findByIdAndUpdate(subTaskId, updates)

          res.status(200).send({ message: "SubTask updated Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
})

module.exports = subTaskRouter;