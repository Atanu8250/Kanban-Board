const express = require('express');
const { userLogin, userSignUp } = require('../controllers/user.controller');

const authRouter = express.Router();

authRouter.post("/login", userLogin)
authRouter.post("/signup", userSignUp)

module.exports = authRouter;