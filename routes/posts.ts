import express from "express";
import passport from "passport";
var router = express.Router();

import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postsController";

import {
  getPostComments,
  createComment,
  getComment,
  deleteComment,
  deletePostComments,
} from "../controllers/commentsController";
router.get("/", getPosts);

router.post("/", passport.authenticate("jwt", { session: false }), createPost);

router.get("/:postId", getPost);
router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  updatePost
);
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
//comments

router.get("/:postId/comments", getPostComments);
router.post("/:postId/comments", createComment);
router.delete("/:postId/comments", deletePostComments);
router.get("/:postId/comments/:commentId", getComment);
router.delete(
  "/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
export default router;
