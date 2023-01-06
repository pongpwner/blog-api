"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const postsController_1 = require("../controllers/postsController");
router.get("/", postsController_1.getPosts);
router.post("/", postsController_1.createPost);
router.get("/:id", postsController_1.getPost);
router.put("/:id", postsController_1.updatePost);
router.delete("/:id", postsController_1.deletePost);
exports.default = router;
