import StatusCodes from "http-status-codes";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const createChat = async (req, res) => {
  const { sender, receiver } = req.body;

  const chatExists = await Chat.find({
    participants: { $all: [sender, receiver] },
  });
  if (chatExists.length === 1) {
    return res.status(StatusCodes.OK).json(chatExists);
  }
  const chat = await Chat.create({ participants: [sender, receiver] });
  const message = await Message.create({
    message: "No messages in this chat.",
    sender: req.userId,
    chat: chat._id,
  });
  chat.latestMessage = message;
  chat.save();
  res.status(StatusCodes.CREATED).json(chat);
};
export const getChatsByUserId = async (req, res) => {
  const { id } = req.params;
  const chats = await Chat.find({ participants: { $in: [id] } })
    .populate("participants")
    .populate("latestMessage");
  res.status(StatusCodes.OK).json(chats);
};
export const getChatById = async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.status(StatusCodes.OK).json({ chat });
};
