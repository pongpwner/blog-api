"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
const postsController_1 = require("../controllers/postsController");
router.get("/", postsController_1.getPosts);
router.post("/", passport_1.default.authenticate("jwt", { session: false }), postsController_1.createPost);
router.get("/:postId", postsController_1.getPost);
router.put("/:postId", passport_1.default.authenticate("jwt", { session: false }), postsController_1.updatePost);
router.delete("/:postId", passport_1.default.authenticate("jwt", { session: false }), postsController_1.deletePost);
exports.default = router;
