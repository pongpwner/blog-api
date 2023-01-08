import express from "express";
var router = express.Router();

import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postsController";
router.get("/", getPosts);

router.post("/", createPost);

router.get("/:postId", getPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
