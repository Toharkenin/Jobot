import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { UserState } from "../../../models/user/userModel";
import { Message } from "../../../model/messageModel";


export function ChatVM() {
  const getUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<UserState>();
  const [chats, setChats] = useState<Message>();


  useEffect(() => {
    if (getUser) {
      setUser(getUser);
    }
  }, [user])

  async function fetchChats(userId: string | undefined) {

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
          console.log("data", data)
          setChats(data)
        })
        .catch((error) => console.error(error));
      console.log('chats', chats)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }




  return {
    user,
    fetchChats,
  };
}
