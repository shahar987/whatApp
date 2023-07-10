import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDown from "@material-ui/icons/Clear";
import db from "./firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat, deleteRoom}) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const [showDownArrow, setShowDownArrow] = useState(false)

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const newMessages = snapshot.docs.map((doc) => {
            const data = doc.data();
            //update the date format
            return {
              ...data,
              lastMessageTime: showTimeLastMsg(data.timestamp?.toDate()),
            };
          });
          setMessages(newMessages);
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const showTimeLastMsg = (compareDate) => {
    const diffInHours = Math.abs(new Date() - compareDate) / (1000 * 60 * 60);

    //Less than a day
    if (diffInHours < 24) {
      let hourMinute = compareDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return hourMinute;
    }
    //Less than a week
    if (diffInHours > 24 && diffInHours < 168) {
      const options = { weekday: "long" };
      const dayOfWeek = compareDate.toLocaleDateString("en-US", options);
      return dayOfWeek;
    }
    //more than a week
    else {
      const day = compareDate.getDate().toString().padStart(2, "0");
      const month = (compareDate.getMonth() + 1).toString().padStart(2, "0");
      const year = compareDate.getFullYear().toString();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat" onMouseEnter={()=>setShowDownArrow(true)} onMouseLeave={()=>setShowDownArrow(false)}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p id="time">{messages[0]?.lastMessageTime}</p>
          <p id="message">{messages[0]?.message}</p>
          {showDownArrow?<KeyboardArrowDown className="delete" onClick={()=>deleteRoom(id)}>delete</KeyboardArrowDown>:<div className="delete"></div>}
          
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
