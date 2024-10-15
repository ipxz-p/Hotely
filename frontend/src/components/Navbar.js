import { Button, DatePicker, Input, Select } from "antd";
import moment from "moment";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const Navbar = forwardRef((props, ref) => {
  const navigate = useNavigate();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [dates, setDates] = useState([]);
  const [numberOfRoom, setNumberOfRoom] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(null);
  const [promotion, setPromotion] = useState("");
  const [isStayFocused, setIsStayFocused] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [isImageVisible, setIsImageVisible] = useState(true);

  // Fade out and change the image
  const handleMouseEnter = (newImgSrc) => {
    setIsImageVisible(false); // Trigger fade out
    setTimeout(() => {
      setImgSrc(newImgSrc); // Change image source
      setIsImageVisible(true); // Trigger fade in
    }, 300); // Delay to match transition duration
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsStayFocused(false);
    }, 150);
  };

  const navigateToRooms = () => {
    const params = {
      roomId,
      checkIn: dates[0] ? dates[0].format("DD/MM/YYYY") : "",
      checkOut: dates[1] ? dates[1].format("DD/MM/YYYY") : "",
      numberOfGuests,
      numberOfRoom,
      promotion,
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `/rooms?${queryString}`;
    navigate(url);
  };

  const isFormValid = () => {
    return roomId && dates?.length && numberOfRoom && numberOfGuests;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useImperativeHandle(ref, () => ({
    toggleSidebar,
  }));

  return (
    <nav className="shadow-md">
      <div className="fixed top-0 h-[60px] z-10 w-full bg-[#fcf6ec] mx-auto flex justify-between items-center border-b border-[#b6b7b9]">
        <Link
          to="/"
          className="text-center text-xl font-bold h-full flex items-center justify-center border border-[#b6b7b9] cursor-pointer flex-shrink-0 w-[220px]"
        >
          TOSCANA VALLEY
        </Link>
        <div className="hidden md:flex space-x-8 border border-[#b6b7b9] h-full w-full items-center gap-6">
          <button
            className="text-gray-800 cursor-pointer ml-14"
            onFocus={() => setIsStayFocused(true)}
            onBlur={handleBlur}
          >
            ที่พัก
          </button>
          <div className="text-gray-800 cursor-pointer">ร้านอาหารและคาเฟ่</div>
          <div className="text-gray-800 cursor-pointer">
            ประชุมและงานจัดเลี้ยง
          </div>
          <div className="text-gray-800 cursor-pointer">โปรโมชั่น</div>
        </div>
        <div className="flex border border-[#b6b7b9] h-full items-center">
          <p className="px-6 cursor-pointer">EN</p>
          <div className="w-[1px] h-6 bg-gray-400"></div>
          <p className="px-6 cursor-pointer">TH</p>
        </div>
        <button
          className="bg-[#313f76] text-white px-4 py-2 h-full text-xl whitespace-nowrap"
          onClick={toggleSidebar}
        >
          สำรองที่พัก
        </button>
      </div>

      {isStayFocused && (
        <div className="nav-stay fixed top-[60px] z-[999] bg-[#fcf6ec] w-full flex">
          <div className="flex-shrink-0 w-[220px] border-r border-r-[#b6b7b9] text-sm p-4 flex flex-col gap-2">
            <div>
              <Link
                to="/stay/1"
                onMouseEnter={() =>
                  handleMouseEnter(
                    "/img/ibe.jfif"
                  )
                }
              >
                โฮเทล พอโตฟิโน่
              </Link>
            </div>
            <div>
              <Link
                to="/stay/7"
                onMouseEnter={() =>
                  handleMouseEnter(
                    "/img/ibe2.jfif"
                  )
                }
              >
                ทอสกานา พิอาซา
              </Link>
            </div>
            <div>
              <Link
                to="/stay/8"
                onMouseEnter={() =>
                  handleMouseEnter(
                    "/img/ibe3.jfif"
                  )
                }
              >
                คาสเทลโล่ เดลลา วัลเล่
              </Link>
            </div>
          </div>
          <div className="p-4 flex-grow flex items-center justify-center">
            <img
              src={imgSrc}
              alt=""
              className={`max-w-full max-h-full object-cover transition-opacity duration-300 ${
                isImageVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      )}

      {/* sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={toggleSidebar} // คลิก backdrop เพื่อปิด
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-[400px] h-full bg-[#fcf6ec] shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-[#b6b7b9] text-[#B6B7B9] flex justify-between items-center">
          <p className="text-xl">สำรองที่พัก</p>
          <IoCloseOutline
            className="text-4xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <div className="flex justify-between text-center gap-1">
          <p className="w-full py-4 border-black border-b cursor-pointer">
            ที่พัก
          </p>
          <p className="w-full py-4 text-[#B6B7B9] border-[#b6b7b9] border-b cursor-default">
            ร้านอาหารและคาเฟ่
          </p>
          <p className="w-full py-4 text-[#B6B7B9] border-[#b6b7b9] border-b cursor-default">
            จัดประชุม
          </p>
        </div>
        <div className="p-4 flex flex-col gap-4">
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
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
          />
          <div className="flex gap-2">
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="จำนวนห้อง"
              onChange={(value) => setNumberOfRoom(value)}
            >
              {Array.from({ length: 3 }, (_, index) => (
                <Select.Option key={index + 1} value={`${index + 1}`}>
                  {index + 1} ห้อง
                </Select.Option>
              ))}
            </Select>
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
          </div>

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
              backgroundColor: isFormValid()
                ? "#db8056"
                : "rgba(0, 0, 0, 0.04)",
              color: isFormValid() ? "#fff" : "rgba(0, 0, 0, 0.25)",
            }}
            disabled={!isFormValid()}
          >
            ตรวจสอบห้องว่าง
          </Button>
        </div>
      </div>
      {/* END sidebar */}
    </nav>
  );
});

export default Navbar;
