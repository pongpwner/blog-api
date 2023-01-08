import express from "express";
var router = express.Router();
import Comment, { IComment } from "../models/Comment";
import {
  getPostComments,
  createComment,
  getComment,
  deleteComment,
} from "../controllers/commentsController";

router.get("/", getPostComments);
router.post("/", createComment);

router.get("/:commentId", getComment);
router.delete("/:commentId", deleteComment);

export default router;
