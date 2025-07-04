import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},{timestamps:true});

const MessageModel= mongoose.model("Message",messageSchema)
export default MessageModel