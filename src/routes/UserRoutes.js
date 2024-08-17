import express from "express";
import UserController from "../controller/UserController.js";
const router = express.Router();

router.post("/login", UserController.getUser);
router.post("/signup", UserController.createUser);
export default router;
