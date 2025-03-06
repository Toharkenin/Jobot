import { MessageModel } from '../../Model/messageModel';


export async function sendMessage (req: any, res: any) {

    const { message } = req.body;
    try {
      const newMessage = new MessageModel({
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        sentAt: new Date(),
      });
  
      await newMessage.save();

      // socketIo.io.to(message.receiverId).emit('receiveMessage', newMessage);
      // socketIo.io.to(message.senderId).emit('receiveMessage', newMessage);
      res.status(201).json(message);
      return newMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: message });
    }
  };
  