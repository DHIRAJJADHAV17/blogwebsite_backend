import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  author_email: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

const Blog = mongoose.model("blog", blogSchema);
export default Blog;
