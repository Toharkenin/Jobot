import { ChatModel } from "../../Model/messageModel";


export const getChats = async (req: any, res: any) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const chats = await ChatModel.find({ senderId: userId,
        isRead: false,
     }).sort({ sentAt: -1 });

    res.status(200).json(chats);
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};