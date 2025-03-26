import { useEffect, useState } from "react";
import { Job } from "../../../model/jobModel";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/user/userSlice";
import { Chat } from "../../../model/ChatModel";
import { io, Socket } from "socket.io-client";
import { JobApplication } from "../../../model/jobApplication";

export function ChatMV() {
  const user = useSelector(userSelector);
  const { jobId } = useParams();
  const [job, setJob] = useState<JobApplication>();
  const [chat, setChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  //TODO ---- change the employer ID,, check if employer is a user and chang it 
  //TODO - Make it work together


  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      transports: ["websocket"],
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.connected);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket?.connected) {
      console.log("Socket is connected");
    } else {
      console.log("Socket is not connected");
    }
  }, [socket]);


  useEffect(() => {
    const fetchData = async () => {
      if (jobId && user?._id) {
        const jobData = await fetchJob(jobId, user._id);
        if (jobData) {
          setJob(jobData);
          await fetchAllChats(user._id, jobData.jobId);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [jobId, user]);


  // Fetch job details
  async function fetchJob(jobId: string | undefined, userId: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/userJob/get-user-job`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, jobId }),
      });
      const data = await response.json();
      console.log("job data..", data, data.job)
      return data; // Return fetched job data
    } catch (error) {
      console.error("Error fetching job:", error);
      return null;
    }
  }

  // Fetch all chats for the user
  async function fetchAllChats(userId: string, jobDetails: Job) {
    try {
      const response = await fetch(`http://localhost:3000/api/chat/get-chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      setChats(data);
      const existingChat = data.find(
        (chat: Chat) => chat.job && chat.user && chat.job._id === jobId && chat.user._id === userId
      );

      if (!jobDetails) {
        console.error("Job details are undefined, cannot create chat");
        return
      }

      if (existingChat !== undefined) {
        setChat(existingChat);
      } else {
        const newChat: Chat = {
          _id: `temp-${Date.now()}`,
          job: jobDetails,
          user: user,
          messages: [],
          lastUpdated: new Date(),
        };
        setChats((prevChats: any) => [...prevChats, newChat]);
        setChat(newChat);
      }

    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  // Join room on selecting a chat
  const joinChatRoom = (chat: Chat) => {
    if (socket && chat?.job?._id) {
      socket.emit("join_chat", chat.job._id);
    }
  };

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;
    console.log(" Listen for new messages")

    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      if (socket) {
        socket.off("receive_message");
      }
    };
  }, [socket]);

  return {
    job,
    user,
    chats,
    chat,
    loading,
    messages,
    joinChatRoom,
    socket,
  };
}
