import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User unauthorized" });

  try {
    const { id, email } = JWT.verify(token, process.env.JWT_SECRET);
    req.userId = id;
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User unauthorized" });
  }
  next();
};
