import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import Post, { IPost } from "../models/Post";
import { body, validationResult } from "express-validator";
export const getPosts = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  Post.find({}, (err: Error, result: [IPost]) => {
    if (err) return next(err);
    res.json({ posts: result });
  });
};

export const createPost = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("title can not be empty")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("content can not be empty")
    .escape(),
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //validation errors
      res.json({ message: "failed to create post", errors: errors });
    } else {
      //no validation errors
      let newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        timestamp: new Date(),
        published: false,
      });
      newPost.save((err) => {
        if (err) return next(err);
        res.json({ message: "post created" });
      });
    }
  },
];

//
export const getPost = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  Post.findById(req.params.postId, (err: Error, result: IPost) => {
    if (err) return next(err);
    res.json({ post: result });
  });
};
export const deletePost = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  Post.findByIdAndDelete(req.params.postId, (err: Error) => {
    if (err) return next(err);
    res.json({ message: "post deleted" });
  });
};
export const updatePost = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("title can not be empty")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("content can not be empty")
    .escape(),
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //validation errors
      res.json({ message: "failed to update post", errors: errors });
    } else {
      //no validation errors

      Post.findByIdAndUpdate(
        req.params.postId,
        {
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
        },
        (err: Error, result: IPost) => {
          if (err) return next(err);
          res.json({ message: result });
        }
      );
    }
  },
];
