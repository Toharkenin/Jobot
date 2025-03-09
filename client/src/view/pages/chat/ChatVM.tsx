import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { UserState } from "../../../models/user/userModel";
import { Message } from "../../../model/messageModel";
// import { io } from 'socket.io-client';


// const socket = io("http://localhost:3000");

export function ChatVM() {
  const getUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<UserState>();
  const [chats, setChats] = useState<Message[]>();
  console.log("d")

  useEffect(() => {
    if (getUser) {
      setUser(getUser);
    }
  }, [user]);

  // useEffect(() => {
  //   // Join chat room
  //   socket.emit("joinChat", chatId);

  //   // Fetch messages
  //   fetch(`http://localhost:5000/chat/${chatId}/messages`)
  //     .then((res) => res.json())
  //     .then((data) => setMessages(data));

  //   // Listen for new messages
  //   socket.on("newMessage", (message) => {
  //     setMessages((prev) => [...prev, message]);
  //   });

  //   return () => {
  //     socket.off("newMessage"); // Cleanup on unmount
  //   };
  // }, [chatId]);

  // // Send message
  // const sendMessage = (content) => {
  //   socket.emit("sendMessage", { chatId, senderId: userId, content });
  // };

  async function fetchChats(userId: UserState | undefined) {
    console.log("in")
    try {
      fetch(`http://localhost:3000/api/chat/get-chats/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setChats(data);
        })
        .catch((error) => console.error(error));
      console.log('chats', chats)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  fetchChats(user);

  return {
    // user,
    fetchChats,
    chats,
  };
}
