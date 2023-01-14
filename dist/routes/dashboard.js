"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const postsController_1 = require("../controllers/postsController");
router.get("/", passport_1.default.authenticate("jwt", { session: false }), postsController_1.getPosts);
exports.default = router;
