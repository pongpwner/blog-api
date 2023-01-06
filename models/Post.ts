import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IPost {
  title: string;
  content: string;
  timestamp: Date;
  published: boolean;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true },
});

export default mongoose.model<IPost>("post", PostSchema);
