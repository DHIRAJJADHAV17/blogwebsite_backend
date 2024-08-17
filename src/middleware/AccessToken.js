import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";

const authenticateTokenss = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET); // Ensure you have your secret key in your environment variables

    req.user = await User.findById(decoded.userinfo._id);

    if (!req.user) return res.sendStatus(401);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default authenticateTokenss;
