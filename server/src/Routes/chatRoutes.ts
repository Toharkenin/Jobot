import  express from "express"
import { getChats } from "../Controllers/message/getChats";
import { sendMessage } from "../Controllers/message/sendMessage";
import { io } from '../server'
import { ChatModel } from "../Model/messageModel";

const router = express.Router();

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on("sendMessage", async ({ chatId, senderId, content }) => {
      const chat = await ChatModel.findById(chatId);
      if (!chat) return;
  
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
    });
  
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat room: ${chatId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

router.get('/get-chats/:chatId', getChats);
router.post('/send-message/:chatId', sendMessage);

export default router;