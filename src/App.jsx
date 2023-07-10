import "./App.css";
import { Chat } from "./components/Chat";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { useStateValue } from "./Hooks/StateProvider";

import React from "react";

export const App = () => {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};
