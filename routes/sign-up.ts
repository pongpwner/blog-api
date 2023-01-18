import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";
import { User } from "../models/User";
var router = express.Router();

router.post(
  "/",
  body("username")
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage("username should be between 1 and 16 characters")
    .escape(),
  body("password").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //validation errors
      res.json({ message: "sign up failed", errors: errors });
    } else {
      //no validation errors
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
    }
  }
);

export default router;
