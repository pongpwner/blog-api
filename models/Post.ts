import mongoose, { ObjectId } from "mongoose";
import { IComment } from "./Comment";
const Schema = mongoose.Schema;

//if i want to include pictures make content an array of strings
export interface IPost {
  _id?: ObjectId;
  category?: string;
  title: string;
  content: string;
  timestamp: Date;
  published: boolean;
  comments?: [IComment];
}

const PostSchema = new Schema<IPost>({
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  published: { type: Boolean },
});

export default mongoose.model<IPost>("post", PostSchema);
