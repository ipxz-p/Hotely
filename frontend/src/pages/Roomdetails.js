import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import api from "../axios";
import { Spin } from "antd";

const Roomdetails = () => {
  const { roomId } = useParams();

  
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  
  const navbarRef = useRef(null);
  const handleToggleSidebar = () => {
    if (navbarRef.current) {
      navbarRef.current.toggleSidebar();
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/room/getRoomById/${roomId}`);
        setRoom(res.data);
      } catch (error) {
        console.error("Error fetching room", error);
      }
    };

    const fetchRoomType = async () => {
      try {
        const res = await api.get(`/roomTypes/getRoomTypesByRoomId/${roomId}`);
        setRoomTypes(res.data);
      } catch (error) {
        console.error("Error fetching room type", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRoom(), fetchRoomType()]);
      setLoading(false);
    };

    if (roomId) {
      fetchData();
    }
  }, [roomId]);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <Navbar ref={navbarRef} />
      <div className="mt-[60px] bg-[#fcf6ec] py-4 px-6">
        <h2 className="text-center">ประเภทที่พักใน {room?.name}</h2>
        <div className="grid grid-cols-2 mt-4">
          {roomTypes.map((roomType, index) => (
            <div
              key={roomType.id}
              className={`p-6 border border-[#b6b7b9] ${
                index % 2 === 0 ? "border-l-0" : "border-r-0"
              } ${index % 2 === 0 ? "pl-0" : "pr-0"}`}
            >
              <img src={roomType.image} alt="" className="max-w-full" />
              <h1 className="mt-4">{roomType.type}</h1>
              <p className="text-sm mt-2">48 ตร.ม / 2 ท่านรวมอาหารเช้า / เตียงคู่หรือเดี่ยว</p>
              <button
                className="border-2 border-gray-400 w-full p-1 mt-4"
                onClick={() => handleToggleSidebar()}
              >
                ตรวจสอบห้องว่าง
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roomdetails;
