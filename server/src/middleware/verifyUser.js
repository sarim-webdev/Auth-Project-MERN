import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) throw new Error("No token Provided!");

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decode.id);

    if (!user) throw new Error("User not found!");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export { verifyUser };
