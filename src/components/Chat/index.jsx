import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ClearIcon from "@material-ui/icons/Clear";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../Hooks/StateProvider";
import { Emojis } from "../Emojis";

export const Chat = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: new Date(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {
              new Date(messages[messages.length - 1]?.timestamp?.toDate())
                .toUTCString
            }
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {showEmojis ? (
        <div>
          <Emojis setInput={setInput} />
        </div>
      ) : null}
      <div className="chat__footer">
        {showEmojis ? (
          <IconButton onClick={() => setShowEmojis(false)}>
            <ClearIcon />
          </IconButton>
        ) : null}
        <IconButton onClick={() => setShowEmojis(true)}>
          <InsertEmoticonIcon />
        </IconButton>

        <IconButton>
          <AttachFile />
        </IconButton>

        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          ></input>
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        {!input ? (
          <IconButton>
            <MicIcon />
          </IconButton>
        ) : (
          <IconButton>
            <SendIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
