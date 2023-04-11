const express = require('express');
const { userSignin, userSignUp } = require('../controllers/user.controller');

const authRouter = express.Router();

authRouter.post("/signin", userSignin)
authRouter.post("/signup", userSignUp)

module.exports = authRouter;