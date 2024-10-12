import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../axios";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FaCheck, FaCreditCard, FaLock } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";

const Reservation = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomId = query.get("roomId");
  const [room, setRoom] = useState(null);
  const [prefix, setPrefix] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [consent, setConsent] = useState(null);

  const isFormValid = () => {
    return (
      prefix &&
      firstname &&
      lastname &&
      email &&
      confirmEmail &&
      email === confirmEmail &&
      tel &&
      consent
    );
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/room/getRoomById/${roomId}`);
        setRoom(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div
      style={{
        backgroundImage: `url(${room?.imageInRoomTypes})`,
        backgroundPosition: "50% 0%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
      className="pb-6"
    >
      <nav
        className={`w-full bg-transparent mx-auto flex items-center ${
          room?.id === 1 ? "text-white" : "text-black"
        } shadow-xl p-2`}
      >
        <Link className="overflow-hidden" to="/">
          <img
            className={`ml-24 h-[120px] w-[auto] max-w-[100%] object-contain ${
              room?.id === 1 ? "transform scale-150" : ""
            }`}
            src={room?.logo}
            alt="roomLogo"
          />
        </Link>
      </nav>
      <div className="max-w-[1200px] w-[90%] mx-auto grid grid-cols-12 gap-8 mt-10">
        {/* left-side */}
        <Form 
          name="reservation" 
          layout="vertical"
          className="col-span-8 w-full bg-white rounded-md p-4"
        >
          <p className="text-xl mb-4">กรุณาใส่รายละเอียด</p>
          {/* กรุณาใส่รายละเอียด */}
          <div className="flex flex-col">
            <div className="flex gap-2 w-full">
              <div className="w-[300px] flex flex-shrink-0 gap-2">
                <Form.Item
                  rules={[{ required: true, message: "กรุณาเลือกคำนำหน้า" }]}
                  label="คำนำหน้า"
                >                  
                  <Select
                    size="middle"
                    style={{ width: "100%" }}
                    onChange={(value) => setPrefix(value)}
                  >
                    <Select.Option value="นาย">นาย</Select.Option>
                    <Select.Option value="น.ส.">น.ส.</Select.Option>
                    <Select.Option value="นาง">นาง</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item 
                  label="ชื่อ" 
                  className="w-full"
                  name="firstname"
                  rules={[{ required: true, message: "กรุณาระบุชื่อ" }]}
                >
                  <Input
                    size="middle"
                    onChange={(e) => setFirstname(e.target.value)}
                    style={{
                      borderColor: firstname ? "#28a745" : "",
                    }}
                    suffix={
                      firstname && <FaCheck className="text-[#28a745]" />
                    }
                  />
                </Form.Item>
              </div>
              <div className="w-full">
                <label htmlFor="lastname">นามสกุล</label>
                <Input
                  size="middle"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="country">ประเทศที่ออกหนังสือเดินทาง</label>
                <Select
                  size="middle"
                  style={{ width: "100%" }}
                  placeholder={"-โปรดเลือก-"}
                  onChange={(value) => setPrefix(value)}
                >
                  <Select.Option value="ประเทศไทย">ประเทศไทย</Select.Option>
                  <Select.Option value="สิงคโปร์">สิงคโปร์</Select.Option>
                  <Select.Option value="อเมริกา">อเมริกา</Select.Option>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <div className="w-[300px] flex-shrink-0">
                <label htmlFor="email">อีเมล</label>
                <Input
                  size="middle"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="confirmEmail">อีเมล (ยืนยัน)</label>
                <Input
                  size="middle"
                  onChange={(e) => setConfirmEmail(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="tel">หมายเลขโทรศัพท์</label>
                <Input size="middle" onChange={(e) => setTel(e.target.value)} />
              </div>
            </div>
          </div>
          {/* เลือกวิธีการชำระเงิน */}
          <div className="mt-12">
            <div className="flex items-center gap-1">
              <FaLock className="text-[#28a745]" />
              <h2>เลือกวิธีการชำระเงิน</h2>
            </div>

            <div
              style={{
                boxShadow: "0 0 0 0.2rem rgba(40, 167, 69, 0.5)",
              }}
              className="p-6 rounded-md mt-2"
            >
              <div className="flex text-[#28a745] items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaCreditCard />
                  <p>บัตรเครดิต / เดบิต</p>
                </div>
                <FaCheck />
              </div>
              <p className="mt-2 font-semibold">
                คุณเลือกที่จะชำระผ่าน บัตรเครดิต / เดบิต
              </p>
              <div className="flex gap-2">
                <img
                  src="https://reservation.travelanium.net/propertyibe2/payment-icon/images/?file=card-type/visa.svg"
                  width="50"
                  alt=""
                />
                <img
                  src="https://reservation.travelanium.net/propertyibe2/payment-icon/images/?file=card-type/mastercard.svg"
                  width="35"
                  alt=""
                />
                <img
                  src="https://reservation.travelanium.net/propertyibe2/payment-icon/images/?file=card-type/jcb.svg"
                  width="30"
                  alt=""
                />
                <img
                  src="https://reservation.travelanium.net/propertyibe2/payment-icon/images/?file=card-type/amex.svg"
                  width="50"
                  alt=""
                />
              </div>
              <p className="mt-2 font-semibold">มั่นใจได้ในการจองห้องพัก</p>
              <div className="flex items-center gap-1 text-sm">
                <FaCheck className="text-[#28a745]" />
                <p>
                  ท่านจะได้ชำระเงินผ่านทาง เกตเวย์การชำระเงินที่ปลอดภัย
                  ในหน้าถัดไป
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <FaCheck className="text-[#28a745]" />
                <p>
                  ท่านจะได้ชำระเงินผ่านทาง เกตเวย์การชำระเงินที่ปลอดภัย
                  ในหน้าถัดไป
                </p>
              </div>
            </div>
          </div>
          {/* ข้อมูลเพิ่มเติม (ถ้ามี) */}
          <div className="mt-12">
            <h2>ข้อมูลเพิ่มเติม (ถ้ามี)</h2>
            <div className="mt-2 grid grid-cols-2">
              <div className="col-span-1 border-r border-[#EBE8E1] p-4">
                <div className="flex flex-col">
                  <div className="text-sm">เดินทางมาที่พักโดย</div>
                  <Select
                    size="middle"
                    style={{ width: "50%" }}
                    placeholder={"-โปรดเลือก-"}
                  >
                    <Select.Option value="เครื่องบิน">เครื่องบิน</Select.Option>
                    <Select.Option value="รถยนต์">รถยนต์</Select.Option>
                    <Select.Option value="อื่น ๆ">อื่น ๆ</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="travelDetail">รายละเอียดการเดินทาง</label>
                  <TextArea rows={4} />
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex flex-col">
                  <label htmlFor="travelDetail">คำขอพิเศษ</label>
                  <TextArea rows={6} />
                </div>
              </div>
            </div>
          </div>
          {/* ข้อตกลงและเงื่อนไขในการสำรองที่พัก */}
          <div className="mt-12">
            <h2>ข้อตกลงและเงื่อนไขในการสำรองที่พัก</h2>
            <Checkbox className="mt-2" onChange={(e) => setConsent(e.target.checked)}>
              <p>
                ฉันได้อ่านและยอมรับ{" "}
                <span className="text-[#db8056] underline font-semibold">
                  ข้อตกลงและเงื่อนไข
                </span>{" "}
                และ{" "}
                <span className="text-[#db8056] underline font-semibold">
                  นโยบายความเป็นส่วนตัว
                </span>
              </p>
            </Checkbox>
          </div>

          <Button
            size="large"
            type="primary"
            style={{
              backgroundColor: isFormValid()
                ? "#db8056"
                : "rgba(0, 0, 0, 0.04)",
              color: isFormValid() ? "#fff" : "rgba(0, 0, 0, 0.25)",
            }}
            className="mt-12 w-fit ml-auto block !rounded-md"
            disabled={!isFormValid()}
          >
            ดำเนินการต่อไปยังฟอร์มชำระเงินที่มีความปลอดภัย
          </Button>
        </Form>
        {/* right-side */}
        <div className="sticky top-6 col-span-4 w-full h-fit bg-white rounded-md p-4 z-10">
          <p className="text-xl font-semibold mb-4">สรุปรายการจอง</p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
