const express = require('express');
const BoardModel = require('../models/board.model');

const boardRouter = express.Router();

boardRouter.get("/", async (req, res) => {

     const userId = req.headers.userId;

     try {
          const baords = await BoardModel.find({ user: userId }).populate('tasks')

          res.status(200).send(baords);
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
})


boardRouter.get("/:id", async (req, res) => {
     const userId = req.headers.userId;
     const boardId = req.params.id;
     try {
          const baord = await BoardModel.findOne({ boardId, userId });

          res.status(200).send(baord);
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
})


boardRouter.post("/", async (req, res) => {
     const userId = req.headers.userId;
     try {
          const board = new BoardModel({ ...req.body, user: userId })
          await board.save();

          res.status(201).send({ message: "Board Created Successfully" });
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
})


boardRouter.patch('/:id', async (req, res) => {
     const boardId = req.params.id;
     const updates = req.body;
     try {
          await BoardModel.findByIdAndUpdate(boardId, updates)

          res.status(200).send({ message: "Board updated Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
})



module.exports = boardRouter;