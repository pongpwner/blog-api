import mongoose, { isObjectIdOrHexString, ObjectId } from "mongoose";
const Schema = mongoose.Schema;

export interface IComment {
  _id?: ObjectId;
  author: string;
  content: string;
  timestamp: Date;
  postId: ObjectId;
}
const CommentSchema = new Schema<IComment>({
  author: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "posts",
  },
});

export default mongoose.model("comment", CommentSchema);
