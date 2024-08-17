import express from "express";
import { param } from "express-validator";
import BlogController from "../controller/BlogController.js";
import authenticateTokenss from "./../middleware/AccessToken.js";

const router = express.Router();

router.get("/get-all-blogs", BlogController.getAllBlog);
router.get(
  "/get-single-blog/:blogId",
  param("blogId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("BlogId paramenter must be a valid string"),
  BlogController.getSinBlog
);
router.get(
  "/getcomment/:commentId",
  param("commentId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("commentId paramenter must be a valid string"),
  BlogController.getallComment
);
router.post("/add-blog", authenticateTokenss, BlogController.addBlog);
router.get("/get-my-blog", authenticateTokenss, BlogController.getMyBlogpages);
router.delete(
  "/delete-note/:noteId",
  param("noteId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("noteId paramenter must be a valid string"),
  authenticateTokenss,
  BlogController.deleteblog
);
router.put(
  "/edit-note/:noteId",
  param("noteId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("noteId paramenter must be a valid string"),
  authenticateTokenss,
  BlogController.editblog
);

router.post("/add-comments", authenticateTokenss, BlogController.addcomment);
export default router;
