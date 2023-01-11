"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "posts",
    },
});
exports.default = mongoose_1.default.model("comment", CommentSchema);
