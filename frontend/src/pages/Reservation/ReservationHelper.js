import { Form } from "antd";
import moment from "moment";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const ReservationHelper = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomId = query.get("roomId");
  const roomTypeId = query.get("roomTypeId");
  const checkIn = query.get("checkIn");
  const checkOut = query.get("checkOut");
  const numberOfGuests = query.get("numberOfGuests");
  const totalDay = moment(checkOut, "DD/MM/YYYY").diff(
    moment(checkIn, "DD/MM/YYYY"),
    "days"
  );

  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [roomType, setRoomType] = useState(null);
  
  return {
    roomId,
    roomTypeId,
    checkIn,
    checkOut,
    numberOfGuests,
    totalDay,
    form,
    modalForm,
    loading,
    setLoading,
    room,
    setRoom,
    roomType,
    setRoomType,
  };
};
