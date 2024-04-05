import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, createHash } from "../utils/bcrypt.js";
import { createJWT } from "../utils/jwt.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "some fields are empty" });

  const user = await User.findOne({ email: email }).select("+password");
  const isPasswordValid = comparePassword(user.password, password);
  if (!isPasswordValid)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email or password invalid" });

  const payload = { id: user._id, email: user.email };
  const token = await createJWT(payload);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "user logged in" });
};

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "some fields are empty" });

  const userExists = await User.findOne({ email: email });
  if (userExists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email already exists" });

  const hashedPassword = await createHash(password);
  const userData = {
    name: name,
    email: email,
    password: hashedPassword,
  };
  const user = await User.create(userData);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "user successfully registered." });
};
export const userLogout = async (req, res) => {};
export const userInfo = async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(StatusCodes.OK).json(user);
};

export const findUsers = async (req, res) => {
  const { searchedPeople } = req.body;
  const data = JSON.stringify(searchedPeople);
  const keyword = {
    $or: [
      { name: { $regex: searchedPeople, $options: "i" } },
      { email: { $regex: searchedPeople, $options: "i" } },
    ],
  };
  const user = await User.find(keyword)
    .find({ _id: { $ne: req.userId } })
    .limit(3);
  res.status(StatusCodes.OK).json(user);
  // res.send("hii");
};
