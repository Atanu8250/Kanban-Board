const express = require('express');
const { getAllBoards, getSingleBoard, createBoard, updateBoard, deleteBoard } = require('../controllers/board.controller');

const boardRouter = express.Router();

boardRouter.get("/", getAllBoards);
boardRouter.get("/:id", getSingleBoard);
boardRouter.post("/", createBoard);
boardRouter.patch('/:id', updateBoard);
boardRouter.delete('/:id', deleteBoard);


module.exports = boardRouter;