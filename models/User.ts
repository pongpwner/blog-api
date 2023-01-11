import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  id?: ObjectId;
  username: string;
  password: string;
}
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
