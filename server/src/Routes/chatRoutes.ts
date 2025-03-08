import  express from "express"
import { getChats } from "../Controllers/message/getChats";
import { sendMessage } from "../Controllers/message/sendMessage";

const router = express.Router()

router.get('/get-chats/:chatId', getChats);
router.post('/send-message/:chatId', sendMessage);

export default router;