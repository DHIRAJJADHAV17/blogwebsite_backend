import Blog from "../model/blogmodel.js";
import Comment from "../model/commentmodel.js";

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    return res.json({
      error: false,
      blogs,
      message: "all blogs ",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const addBlog = async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Blog({
      title,
      content,
      author: user.fullname,
      author_email: user.email,
    });

    await note.save();

    return res.json({ error: false, message: "Note Added", note });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const getMyBlogpages = async (req, res) => {
  try {
    const userId = req.user.email;

    const myblog = await Blog.find({
      author_email: userId,
    });

    return res.json({
      error: false,
      myblogs: myblog,
      message: "Blogs retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
};

const deleteblog = async (req, res) => {
  const noteId = req.params.noteId;

  try {
    // Assuming `req.user` contains the authenticated user's information
    const userId = req.user._id;
    console.log(noteId);

    // Find the blog post
    const blog = await Blog.findOne({
      _id: noteId,
    });

    // If the blog post is not found, return a 404 error
    if (!blog) {
      return res.status(404).json({
        error: true,
        message: "Blog post not found",
      });
    }

    // Delete the blog post
    await Blog.deleteOne({ _id: noteId });

    // Respond with success message
    return res.json({
      error: false,
      message: "Blog post deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const editblog = async (req, res) => {
  const noteId = req.params.noteId;

  const { title, content } = req.body;

  const user = req.user;
  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "No Changes provided" });
  }
  try {
    const note = await Blog.findById({ _id: noteId });
    console.log(note);

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    note.author = user.fullname;
    note.author_email = user.email;
    note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const addcomment = async (req, res) => {
  const { content, blogid } = req.body;
  const user = req.user;

  if (!blogid) {
    return res.status(400).json({ error: true, message: "blog is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Comment({
      blogid,
      content,
      author: user.fullname,
    });

    await note.save();

    return res.json({ error: false, message: "Note Added", note });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
export const getSinBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const blog = await Blog.find({ _id: blogId });

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getallComment = async (req, res) => {
  try {
    const comments = await Comment.find();

    return res.json({
      error: false,
      comments,
      message: "all comments ",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default {
  getAllBlog,
  addBlog,
  getMyBlogpages,
  deleteblog,
  editblog,
  addcomment,
  getSinBlog,
  getallComment,
};
