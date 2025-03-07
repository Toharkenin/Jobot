import { Types, Schema, model } from "mongoose";


const MessageSchema = new Schema({
    senderId:Types.ObjectId,
    receiverId:Types.ObjectId,
    content:String,
    sentAt:Date,
    isRead:Boolean
});

const ChatSchema = new Schema({
    users: [{ type: Types.ObjectId, ref: "User", required: true }],
    messages: [MessageSchema], 
    lastUpdated: { type: Date, default: Date.now },
  });


export const MessageModel = model("Message",MessageSchema);
export const ChatModel = model("Chat",ChatSchema);