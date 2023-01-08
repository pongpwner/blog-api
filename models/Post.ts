import mongoose, { ObjectId } from "mongoose";
import { IComment } from "./Comment";
const Schema = mongoose.Schema;

export interface IPost {
  _id?: ObjectId;
  title: string;
  content: string;
  timestamp: Date;
  published: boolean;
  comments?: [IComment];
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  published: { type: Boolean, default: false },
});

export default mongoose.model<IPost>("post", PostSchema);
