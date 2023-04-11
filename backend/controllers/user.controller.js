const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async (req, res) => {
     const { email, password } = req.body;
     try {
          const matchedUser = await UserModel.findOne({ email });
          if (matchedUser) {
               bcrypt.compare(password, matchedUser._doc.password, function (err, result) {
                    if (result) {
                         const token = jwt.sign({
                              email
                         }, process.env.SECRET_KEY, { expiresIn: '24h' });
                         res.status(200).send({ message: "Login success", user: { ...matchedUser._doc, token } });
                    } else {
                         res.status(400).send({ message: "Wrong Password!" })
                    }
               });
          } else {
               res.status(404).send({ message: "User not found!" });
          }
     } catch (error) {
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}


const userSignUp = async (req, res) => {
     const { email, password } = req.body;

     try {
          const matchedUsers = await UserModel.find({ email });
          if (matchedUsers.length) {
               res.status(200).send({
                    message: "User already exists!"
               });
          } else {
               bcrypt.hash(password, +process.env.SALT_ROUND, async function (err, hash) {
                    if (err) {
                         res.status(500).send({
                              message: "error in bcrypt"
                         });
                    } else {
                         const user = new UserModel({ email, password: hash });
                         await user.save();
                         res.status(201).send({
                              message: "Sign-up Sccess"
                         })
                    }
               });
          }
     } catch (error) {
          res.status(500).send({
               message: "Internal server error!",
               error: error
          });
     }
}

module.exports = { userLogin, userSignUp };