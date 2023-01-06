import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  username: string;
  password: string;
}
const UserSchema = new Schema({
  username: { username: String, required: true },
  password: { username: String, required: true },
});

export default mongoose.model("user", UserSchema);
