import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { Search } from "./Search";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  const getRooms = () => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getRooms();
  }, []);

  const deleteRoom = (id) => {
    const objectRef = db.collection("rooms").doc(id);
    objectRef
      .delete()
      .then(() => {
        console.log("Object deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting object:", error);
      });
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <Search rooms={rooms} setRooms={setRooms} getRooms={getRooms}/>
      </div>
      <div className="sidebar__chat">
        <SidebarChat addNewChat />
        {rooms.map((room) => {
          return (
            <SidebarChat
              key={room.id}
              id={room.id}
              name={room.data.name}
              deleteRoom={deleteRoom}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
