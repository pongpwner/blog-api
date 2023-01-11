import express, { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";
import { User } from "../models/User";
var router = express.Router();

router.post("/", (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    //check err
    if (err) {
      return next(err);
    }
    let userDetails = {
      username: req.body.username,
      password: hash,
    };
    console.log(userDetails);
    let newUser = new User(userDetails);
    //save user to database
    console.log(newUser);
    newUser.save((err) => {
      if (err) {
        return next(err);
      }

      res.json({ status: "created account" });
    });
  });
});

export default router;
