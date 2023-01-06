import express from "express";
var router = express.Router();
import Post from "../models/Post";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postsController";
router.get("/", getPosts);

router.post("/", createPost);

router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
