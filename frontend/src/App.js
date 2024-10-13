import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Reservation from "./pages/Reservation/Reservation";
import { ConfigProvider } from "antd";
import Roomdetails from "./pages/Roomdetails";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "SUKHUMVITSET",
        },
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay/:roomId" element={<Roomdetails />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/reservation" element={<Reservation />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
