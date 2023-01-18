"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.getComment = exports.createComment = exports.getPostComments = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const express_validator_1 = require("express-validator");
const getPostComments = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentPostId = req.params.postId;
        let comments = yield Comment_1.default.find({ postId: currentPostId });
        res.json({ comments: comments });
    });
};
exports.getPostComments = getPostComments;
exports.createComment = [
    (0, express_validator_1.body)("author")
        .trim()
        .isLength({ min: 1, max: 16 })
        .withMessage("name needs top be 1-16 characters")
        .escape(),
    (0, express_validator_1.body)("content")
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage("comment needs to be 1-500 characters")
        .escape(),
    function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                //there are validation errors
                res.json({ message: "failed to post comment", errors: errors });
            }
            else {
                //no validaiton errors
                console.log("trying to create comment");
                let currentPostId = req.params.postId;
                let newComment = new Comment_1.default({
                    author: req.body.author,
                    content: req.body.content,
                    postId: currentPostId,
                    timestamp: new Date(),
                });
                console.log("comment created");
                yield newComment.save();
                console.log("comment saved");
                res.json({ comment: newComment });
            }
        });
    },
];
const getComment = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let comment = yield Comment_1.default.find({ _id: req.params.commentId });
        res.json({ comment: comment });
    });
};
exports.getComment = getComment;
const deleteComment = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Comment_1.default.findByIdAndDelete(req.params.commentId);
        res.json({ message: "comment deleted" });
    });
};
exports.deleteComment = deleteComment;
exports.updateComment = [
    (0, express_validator_1.body)("content")
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage("comment needs to be 1-500 characters")
        .escape(),
    function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                //validation errors
                res.json({ message: "failed to update comment", errors: errors });
            }
            else {
                //no validation errors
                let newComment = yield Comment_1.default.findByIdAndUpdate(req.params.commentId, {
                    content: req.body.content,
                }, (err, result) => {
                    if (err)
                        return next(err);
                    res.json({ comment: result });
                });
                res.send({ comment: newComment });
            }
        });
    },
];
