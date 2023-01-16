import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import Post, { IPost } from "../models/Post";

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

export const createPost = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
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
};

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
  //implement
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
export const updatePost = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  //if updating published

  console.log("update comment content");
  //if updating post content
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
};
