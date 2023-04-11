const express = require('express');

const authRouter = express.Router();


authRouter.post("/login", async (req, res) => {
     res.send("/login route");
})

authRouter.post("/signup", async (req, res) => {
     res.send("/signup route")
})

module.exports = authRouter;