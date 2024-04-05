import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
  },
  sentTime: { type: Date, default: Date.now },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

export default mongoose.model("Message", messageSchema);
