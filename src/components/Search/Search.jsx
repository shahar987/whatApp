import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import "./Search.css";
import { lowerCase } from "lodash";

export const Search = ({rooms, setRooms, getRooms}) => {
  const search = (e) => {
    const searchInput = lowerCase(e.target.value);
    if (searchInput === "") {
      getRooms()
    } else {
      const filteredRooms = rooms.filter((room) =>
        lowerCase(room.data.name).includes(searchInput)
      );
      setRooms(filteredRooms);
    }
  };
  return (
    <div className="sidebar__searchContainer">
      <SearchOutlined />
      <input
        placeholder="Search or start new chat"
        type="text"
        onChange={(e) => search(e)}
      />
    </div>
  );
};
