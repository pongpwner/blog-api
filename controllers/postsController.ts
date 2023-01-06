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
  Post.findById(req.params.id, (err: Error, result: IPost) => {
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
  Post.findByIdAndDelete(req.params.id, (err: Error) => {
    if (err) return next(err);
    res.json({ message: "post deleted" });
  });
};
export const updatePost = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, content: req.body.content },
    (err: Error, result: IPost) => {
      if (err) return next(err);
      res.json({ message: result });
    }
  );
  //req.params.id
  //implement
};
