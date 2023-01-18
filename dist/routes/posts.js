"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
const postsController_1 = require("../controllers/postsController");
const commentsController_1 = require("../controllers/commentsController");
router.get("/", postsController_1.getPosts);
router.post("/", passport_1.default.authenticate("jwt", { session: false }), postsController_1.createPost);
router.get("/:postId", postsController_1.getPost);
router.put("/:postId", passport_1.default.authenticate("jwt", { session: false }), postsController_1.updatePost);
router.delete("/:postId", passport_1.default.authenticate("jwt", { session: false }), postsController_1.deletePost);
//comments
router.get("/:postId/comments", commentsController_1.getPostComments);
router.post("/:postId/comments", commentsController_1.createComment);
router.get("/:postId/comments/:commentId", commentsController_1.getComment);
router.delete("/:postId/comments/:commentId", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.deleteComment);
exports.default = router;
