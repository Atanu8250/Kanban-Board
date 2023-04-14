const TaskModel = require('../models/task.model');
const BoardModel = require('../models/board.model');
const SubTaskModel = require('../models/subTask.model');

const getAllBoards = async (req, res) => {
     const userId = req.headers.userId;

     try {
          const baords = await BoardModel.find({ user: userId }).select(['-user', '-tasks', '-v'])

          res.status(200).send(baords);
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
}


const getSingleBoard = async (req, res) => {
     const userId = req.headers.userId;
     const boardId = req.params.id;
     try {
          const baord = await BoardModel.findOne({ _id: boardId, user: userId }).populate({
               path: 'tasks',
               populate: {
                    path: 'subtask'
               }
          });

          res.status(200).send(baord);
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
}


const createBoard = async (req, res) => {
     const userId = req.headers.userId;
     try {
          const board = new BoardModel({ ...req.body, user: userId })
          await board.save();

          res.status(201).send({ message: "Board Created Successfully" });
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
}


const updateBoard = async (req, res) => {
     const boardId = req.params.id;
     const updates = req.body;
     try {
          await BoardModel.findByIdAndUpdate(boardId, updates)

          res.status(200).send({ message: "Board updated Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}


const deleteBoard = async (req, res) => {
     const boardId = req.params.id;
     try {
          const board = await BoardModel.findById(boardId);

          // ? Delete the tasks assigned to the board and the subtasks also
          const taskArray = board.tasks.map(async (ele) => await TaskModel.findById(ele))
          const resolvedTaskArray = await Promise.all(taskArray);

          resolvedTaskArray.map(async (ele) => {
               ele.subtask.map(async (childEle) => {
                    await SubTaskModel.findByIdAndDelete(childEle);
               })
               await TaskModel.findByIdAndDelete(ele);
          })

          await BoardModel.findByIdAndDelete(boardId)

          res.status(200).send({ message: "Board deleted Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}

module.exports = { getAllBoards, getSingleBoard, createBoard, updateBoard, deleteBoard };