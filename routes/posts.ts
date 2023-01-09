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

export default router;
