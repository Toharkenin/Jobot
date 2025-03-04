import  express from "express"
import { sendMessage } from '../Controllers/message/sendMessage';

const router = express.Router()

router.post(`/send-message`, sendMessage);

export default router;