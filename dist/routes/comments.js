"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const commentsController_1 = require("../controllers/commentsController");
router.get("/", commentsController_1.getPostComments);
router.post("/", commentsController_1.createComment);
router.get("/:commentId", commentsController_1.getComment);
router.delete("/:commentId", passport_1.default.authenticate("jwt", { session: false }), commentsController_1.deleteComment);
exports.default = router;
