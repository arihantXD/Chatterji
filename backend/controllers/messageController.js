import { StatusCodes } from "http-status-codes";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const createMessage = async (req, res) => {
  const { message, sender, chat } = req.body;
  if (!message || !sender || !chat)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "empty fields found" });
  const result = await Message.create({ message, sender, chat });
  const foundChat = await Chat.findOneAndUpdate(
    { _id: chat },
    { latestMessage: result },
    { new: true }
  ).populate("latestMessage");
  res.status(StatusCodes.CREATED).json(result);
};

export const getAllChatMessages = async (req, res) => {
  const { id } = req.body;
  const messages = await Message.find({ chat: id })
    .populate("sender")
    .sort({ sentTime: -1 });
  res.status(StatusCodes.OK).json(messages);
};
