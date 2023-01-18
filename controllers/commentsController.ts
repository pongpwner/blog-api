import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import Comment, { IComment } from "../models/Comment";
import { body, validationResult } from "express-validator";
export const getPostComments = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let currentPostId = req.params.postId;
  let comments = await Comment.find({ postId: currentPostId });
  res.json({ comments: comments });
};
export const createComment = [
  body("author")
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage("name needs top be 1-16 characters")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("comment needs to be 1-500 characters")
    .escape(),

  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //there are validation errors
      res.json({ message: "failed to post comment", errors: errors });
    } else {
      //no validaiton errors
      console.log("trying to create comment");
      let currentPostId = req.params.postId;
      let newComment = new Comment({
        author: req.body.author,
        content: req.body.content,
        postId: currentPostId,
        timestamp: new Date(),
      });
      console.log("comment created");
      await newComment.save();
      console.log("comment saved");
      res.json({ comment: newComment });
    }
  },
];

export const getComment = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let comment = await Comment.find({ _id: req.params.commentId });
  res.json({ comment: comment });
};

export const deleteComment = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.json({ message: "comment deleted" });
};

export const updateComment = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("comment needs to be 1-500 characters")
    .escape(),
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //validation errors
      res.json({ message: "failed to update comment", errors: errors });
    } else {
      //no validation errors
      let newComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
          content: req.body.content,
        },
        (err: Error, result: IComment) => {
          if (err) return next(err);
          res.json({ comment: result });
        }
      );
      res.send({ comment: newComment });
    }
  },
];
