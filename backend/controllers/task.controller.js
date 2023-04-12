const TaskModel = require('../models/task.model');
const BoardModel = require('../models/board.model');
const SubTaskModel = require('../models/subTask.model');


const createTask = async (req, res) => {
     const boardId = req.params.id;
     const task = req.body;
     try {
          // Finding the board in which we will store the specific Task
          const board = await BoardModel.findById(boardId);

          // store the crated subTask's ids
          let subTaskIds = [];

          // ? Creating subTasks for the specific task
          if (task.subtask) {
               try {
                    subTaskIds = await Promise.all(task.subtask.map(async e => {
                         const newSubTask = new SubTaskModel({ title: e })
                         await newSubTask.save();
                         return newSubTask._id;
                    }))
               } catch (error) {
                    console.log('error in subtask creation:', error)
                    res.status(500).send({ mesesage: error.message, error });
                    return;
               }
          }

          // ? Adding all the subtask's ids in the specific task
          const newTask = new TaskModel({ ...task, subtask: subTaskIds });

          // ? Adding the task's id in the specific board;
          board.tasks = [...board.tasks, newTask._id];

          await newTask.save();
          await board.save();

          res.status(201).send({ message: `Task Created Successfully in ${board.name}` });
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ mesesage: error.message, error });
     }
}


const updateTask = async (req, res) => {
     const taskId = req.params.id;
     const updates = req.body;
     try {
          await TaskModel.findByIdAndUpdate(taskId, updates)

          res.status(200).send({ message: "Task updated Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}


const deleteTask = async (req, res) => {
     const taskId = req.params.id;
     const { boardId } = req.body;
     try {
          const task = await TaskModel.findById(taskId);
          const board = await BoardModel.findById(boardId);

          // ? Delete the task reference from the board;
          board.tasks = board.tasks.filter(el => el.toString() !== taskId);
          await board.save();

          // ? Delete all subtasks which are under task we have.
          try {
               await Promise.all(task.subtask.map(async el => await SubTaskModel.findByIdAndDelete(el)))
          } catch (error) {
               console.log('error:', error)
               res.status(500).send({ message: 'Getting error while deleting the Subtasks', error });
               return;
          }
          await TaskModel.findByIdAndDelete(taskId)

          res.status(200).send({ message: "Task deleted Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}


module.exports = { createTask, updateTask, deleteTask };