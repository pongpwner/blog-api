import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import Comment, { IComment } from "../models/Comment";

export const getPostComments = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let currentPostId = req.params.postId;
  let comments = await Comment.find({ postId: currentPostId });
  res.json({ comments: comments });
};
export const createComment = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("trying to create comment");
  let currentPostId = req.params.postId;
  let newComment = new Comment({
    author: req.body.author,
    content: req.body.content,
    postId: currentPostId,
  });
  console.log("comment created");
  await newComment.save();
  console.log("comment saved");
  res.json({ comment: newComment });
};

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

export const updateComment = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
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
};
