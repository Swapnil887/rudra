const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.model");

userRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, encrypted_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: encrypted_password,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send("Error while registering");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "coders");
          res.send({ message: "Logged in Successfully", token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.send("Error", error);
  }
});
module.exports = { userRouter };
