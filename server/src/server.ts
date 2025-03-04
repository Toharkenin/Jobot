import express from 'express'
import authRoutes from "./Routes/authRoutes";
import cookieParser from 'cookie-parser';
import cors from "cors"
import mongoose from 'mongoose';
import 'dotenv/config';
import jobRoutes from './Routes/jobRoutes';
import { Server } from "socket.io";
import http from 'http'
import { sendMessage } from './Controllers/message/sendMessage';

const app = express()
const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Array of allowed origins
  credentials: true
}));


export const secretKey = String(process.env.SECRET_JWT) || "1234";
export const saltRounds = Number(process.env.SALT_BCRYPT) || 3;


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);


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

  socket.on('sendMessage', async (message) => {
    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Error handling sendMessage:', error);
    }
  });

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});