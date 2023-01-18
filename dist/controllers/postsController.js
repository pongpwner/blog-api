"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const express_validator_1 = require("express-validator");
const getPosts = function (req, res, next) {
    Post_1.default.find({}, (err, result) => {
        if (err)
            return next(err);
        res.json({ posts: result });
    });
};
exports.getPosts = getPosts;
exports.createPost = [
    (0, express_validator_1.body)("title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("title can not be empty")
        .escape(),
    (0, express_validator_1.body)("content")
        .trim()
        .isLength({ min: 1 })
        .withMessage("content can not be empty")
        .escape(),
    function (req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            //validation errors
            res.json({ message: "failed to create post", errors: errors });
        }
        else {
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
        }
    },
];
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
exports.updatePost = [
    (0, express_validator_1.body)("title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("title can not be empty")
        .escape(),
    (0, express_validator_1.body)("content")
        .trim()
        .isLength({ min: 1 })
        .withMessage("content can not be empty")
        .escape(),
    function (req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            //validation errors
            res.json({ message: "failed to update post", errors: errors });
        }
        else {
            //no validation errors
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
        }
    },
];
