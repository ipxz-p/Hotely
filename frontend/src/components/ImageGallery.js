import React, { useEffect, useState } from "react";
import api from "../axios";

const ImageGallery = () => {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fecthRooms = async () => {
      try {
        const { data } = await api.get("/room/getRooms");
        setRooms(data)
      } catch (error) {
        console.error(error)
      }
    }
    fecthRooms()
  }, [])

  return (
    <div className="m-6">
      <h1>ที่พัก</h1>
      <p className="my-2">
        พักผ่อนและเติมเต็มความสุข กับที่พักบรรยากาศแคว้นทัสคานี
        ที่โอบล้อมด้วยทัศนียภาพอันงดงามของเขาใหญ่
      </p>
      <div className="grid grid-cols-3 gap-10">
        {
          rooms.map((room) => (
            <div key={room.title}>
              <img src={room.image} alt="" />
              <h1 className="my-4">{room.name}</h1>
              <p className="text-sm">{room.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ImageGallery;
