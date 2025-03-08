import express from 'express'
import authRoutes from "./Routes/authRoutes";
import employerRoutes from "./Routes/employerRoutes"
import cookieParser from 'cookie-parser';
import cors from "cors"
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './Routes/jobRoutes';
import { Server } from "socket.io";
import http from 'http'
import { sendMessage } from './Controllers/message/sendMessage';
import userPreferencesRouter from "./Routes/userRoutes";
import chatRoutes from './Routes/chatRoutes'
import { ChatModel } from './Model/messageModel';


const app = express()
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], // Array of allowed origins
  credentials: true
}));


export const secretKey = String(process.env.SECRET_JWT) || "1234";
export const saltRounds = Number(process.env.SALT_BCRYPT) || 3;

app.use("/api/user", userPreferencesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/employer/jobs", employerRoutes);
app.use("/api/chat", chatRoutes);


const dbUrl = process.env.DB_URL;
const database = 'jobot';

//connection
mongoose.connect(`${dbUrl}${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

//socket connection
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

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

export { io };