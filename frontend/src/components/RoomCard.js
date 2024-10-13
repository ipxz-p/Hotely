import { Button } from "antd";
import React from "react";
import { IoFastFood } from "react-icons/io5";
import { IoIosWifi } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ roomId, roomTypeId, checkIn, checkOut, numberOfGuests, type, image, price }) => {
    const navigate = useNavigate()
    const navigateToReservation = () => {
        const params = {
            roomId,
            roomTypeId,
            checkIn,
            checkOut,
            numberOfGuests
          };
          const queryString = new URLSearchParams(params).toString();
          const url = `/rooms/reservation?${queryString}`;
          navigate(url);
    }
  return (
    <div className="bg-white p-8">
      <div className="flex justify-between">
        <p className="text-2xl mb-2 font-light">{type}</p>
        <p className="self-end mr-[135px] text-xs font-semibold">ต่อห้องต่อคืน</p>
      </div>
      <div className="flex">
        <img className="w-[30%]" src={image} alt="ดีลักซ์คอร์เนอร์" />
        <div className="ml-4 pl-4 py-4 border-y-[#dee2e6] border-y w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">Room with Breakfast</p>
              <p className="my-2">คุณจะได้รับ...</p>
              <div className="flex text-sm font-light gap-20">
                <div className="flex justify-center items-center gap-2">
                    <IoFastFood />
                    <p> อาหารเช้า 2 ท่าน</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <IoIosWifi />
                    <p>อินเทอร์เน็ต</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <p className="font-semibold">
                    <span>THB </span> 
                    <span className="text-2xl text-[#db8056]">{price.toLocaleString()}</span>
                </p>
                <p className="text-xs whitespace-nowrap">รวมภาษีและค่าธรรมเนียม</p>
              </div>
              <Button
                onClick={navigateToReservation}
                size="large"
                type="primary"
                style={{
                  width: "100px",
                  height: "35px",
                  backgroundColor: "#db8056",
                  color: "#fff",
                }}
                className="!rounded-md ml-[35px]"
              >
                จอง
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
