import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // attach user object to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
