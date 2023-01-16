"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const getPosts = function (req, res, next) {
    Post_1.default.find({}, (err, result) => {
        if (err)
            return next(err);
        res.json({ posts: result });
    });
};
exports.getPosts = getPosts;
const createPost = function (req, res, next) {
    console.log(req.body);
    let newPost = new Post_1.default({
        title: req.body.title,
        content: req.body.content,
        timestamp: new Date(),
        published: false,
    });
    newPost.save((err) => {
        if (err)
            return next(err);
        res.json({ message: "post created" });
    });
};
exports.createPost = createPost;
//
const getPost = function (req, res, next) {
    Post_1.default.findById(req.params.postId, (err, result) => {
        if (err)
            return next(err);
        res.json({ post: result });
    });
    //implement
};
exports.getPost = getPost;
const deletePost = function (req, res, next) {
    Post_1.default.findByIdAndDelete(req.params.postId, (err) => {
        if (err)
            return next(err);
        res.json({ message: "post deleted" });
    });
};
exports.deletePost = deletePost;
const updatePost = function (req, res, next) {
    console.log(req.body);
    //if updating published
    console.log("update comment content");
    //if updating post content
    Post_1.default.findByIdAndUpdate(req.params.postId, {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
    }, (err, result) => {
        if (err)
            return next(err);
        res.json({ message: result });
    });
};
exports.updatePost = updatePost;
