import  express from "express"
import { sendMessage } from '../Controllers/message/sendMessage';
import { getChats } from "../Controllers/message/getChats";

const router = express.Router()

// router.post(`/send-message`, sendMessage);
router.get('/get-chats/:userId', getChats)

export default router;