import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  blogid: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
