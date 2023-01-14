import express, { Request, Response } from "express";
var router = express.Router();
import passport from "passport";
import { isAuth } from "../utils/isAuth";
import { getPosts } from "../controllers/postsController";
router.get("/", passport.authenticate("jwt", { session: false }), getPosts);

export default router;
