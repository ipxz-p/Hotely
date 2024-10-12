import React, { useState } from "react";
import { Select, DatePicker, Button, Input } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const BookingForm = () => {
  const [roomId, setRoomId] = useState("");
  const [dates, setDates] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(null);
  const [promotion, setPromotion] = useState("");
  const navigate = useNavigate();

  const navigateToRooms = () => {
    const params = {
      roomId,
      checkIn: dates[0] ? dates[0].format("DD/MM/YYYY") : "",
      checkOut: dates[1] ? dates[1].format("DD/MM/YYYY") : "",
      numberOfGuests,
      promotion,
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `/rooms?${queryString}`;
    navigate(url);
  };

  const isFormValid = () => {
    return roomId && dates?.length && numberOfGuests;
  };

  return (
    <div className="flex justify-center items-center px-6 mt-4">
      <Select
        size="large"
        style={{ width: "100%" }}
        placeholder="เลือกที่พัก"
        onChange={(value) => setRoomId(value)}
      >
        <Select.Option value="1">โฮเทล พอโตฟิโน่</Select.Option>
        <Select.Option value="7">ทอสกานา พิอาซา</Select.Option>
        <Select.Option value="8">คาสเทลโล่ เดลลา วัลเล่</Select.Option>
      </Select>

      <RangePicker
        size="large"
        placeholder={["วันที่เช็คอิน", "วันที่เช็คเอาท์"]}
        style={{ width: "100%" }}
        value={dates}
        format="DD/MM/YYYY"
        onChange={(dateRange) => setDates(dateRange)}
        disabledDate={(current) => current && current < moment().startOf("day")}
      />

      <Select
        size="large"
        style={{ width: "100%" }}
        placeholder="จำนวนผู้เข้าพัก"
        onChange={(value) => setNumberOfGuests(value)}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <Select.Option key={index + 1} value={`${index + 1}`}>
            {index + 1} ผู้ใหญ่
          </Select.Option>
        ))}
      </Select>

      <Input
        size="large"
        placeholder="รหัสโปรโมชั่น"
        onChange={(e) => setPromotion(e.target.value)}
      />

      <Button
        size="large"
        type="primary"
        onClick={navigateToRooms}
        style={{
          width: "100%",
          backgroundColor: isFormValid() ? "#db8056" : "rgba(0, 0, 0, 0.04)",
          color: isFormValid() ? "#fff" : "rgba(0, 0, 0, 0.25)",
        }}
        disabled={!isFormValid()}
      >
        ตรวจสอบห้องว่าง
      </Button>
    </div>
  );
};

export default BookingForm;
