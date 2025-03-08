import { ChatModel } from "../../Model/messageModel";
import { io } from '../../server'


export const sendMessage = async (req: any, res: any) => {
  try {
    const { chatId } = req.params;
    const { senderId, content } = req.body;

    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newMessage = {
      senderId,
      content,
      sentAt: new Date(),
      isRead: false,
    };

    chat.messages.push(newMessage);
    chat.lastUpdated = new Date();
    await chat.save();

    io.to(chatId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};