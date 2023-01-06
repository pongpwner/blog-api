import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IComment {
  author: string;
  content: string;
}
const CommentSchema = new Schema<IComment>({
  author: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model("comment", CommentSchema);
