import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button, Checkbox, Form, Input, Modal, Rate, Select, Spin } from "antd";
import { FaCheck, FaCreditCard, FaLock } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import Payment from 'payment';
import api from "../../axios";
import { ReservationHelper } from "./ReservationHelper";

const Reservation = () => {
  const {
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
    setRoomType
  } = ReservationHelper()

  const [prefix, setPrefix] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [consent, setConsent] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(true);
  const [bookingNumber, setBookingNumber] = useState(false);
  const [openCardDetailModal, setOpenCardDetailModal] = useState(false);
  const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false);
  const [openFailedPaymentModal, setOpenFailedPaymentModal] = useState(false);
  const [formattedNumber, setFormattedNumber] = useState("");

  const values = Form.useWatch([], form);
  const validatePhoneNumber = (_, value) => {
    const phonePattern = /^0[0-9]{9}$/;
    if (!value) {
      return Promise.resolve();
    }
    if (phonePattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("หมายเลขโทรศัพท์ไม่ถูกต้อง"));
  };
  const handleSubmit = () => {
    const generateBookingNumber = () => {
      return Math.floor(1000000 + Math.random() * 9000000).toString();
    };

    setBookingNumber(generateBookingNumber());
    setOpenCardDetailModal(true);
  };

  const handleCardDetailForm = async () => {
    try {
      await modalForm.validateFields();
      const cardNumber = modalForm.getFieldValue("cardNumber");
      const { data } = await api(
        `/blacklist/getBlacklistByCardBlacklist/${cardNumber}`
      );
      setOpenCardDetailModal(false);
      if (typeof data === "object") {
        setOpenFailedPaymentModal(true);
      } else {
        setOpenSuccessPaymentModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function clearNumber(value = '') {
    return value.replace(/\D+/g, ''); // Remove all non-digit characters
  }
  
  function formatCreditCardNumber(value) {
    if (!value) return value;
  
    const issuer = Payment.fns.cardType(value); // Get the card type (Visa, Amex, etc.)
    const clearValue = clearNumber(value);
    let formattedValue;
  
    switch (issuer) {
      case 'amex':
        formattedValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`;
        break;
      case 'dinersclub':
        formattedValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`;
        break;
      default:
        formattedValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
        break;
    }
  
    return formattedValue.trim();
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCreditCardNumber(value);
    setFormattedNumber(formattedValue);
    console.log(formattedValue);

    // Set the formatted value back into the form
    modalForm.setFieldsValue({
      cardNumber: formattedValue,
    });
  };

  const validateCardNumber = (_, value) => {
    if (!value) return Promise.resolve();
    const clearValue = clearNumber(value);
    const isValid = Payment.fns.validateCardNumber(clearValue);
    return isValid ? Promise.resolve() : Promise.reject(new Error("หมายเลขบัตรไม่ถูกต้อง"));
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
        const res = await api.get(`/roomTypes/getRoomTypeById/${roomTypeId}`);
        setRoomType(res.data);
      } catch (error) {
        console.error("Error fetching room type", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRoom(), fetchRoomType()]);
      setLoading(false);
    };

    if (roomId && roomTypeId) {
      fetchData();
    }
  }, [roomId, roomTypeId]);

  useEffect(() => {
    setTotalPrice((roomType?.price * totalDay).toLocaleString());
  }, [roomType, totalDay]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((formValues) => {
        setIsSubmitDisabled(!Object.values(formValues).length);
      })
      .catch(() => {
        setIsSubmitDisabled(true);
      });
  }, [form, values]);

  if (loading) {
    return <Spin fullscreen />;
  }

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
      <Modal
        centered
        open={openCardDetailModal}
        onCancel={() => setOpenCardDetailModal(false)}
        width={400}
        footer={null}
        className="model"
      >
        <div className="flex items-center">
          <img src={room?.logo} alt="Hotel Portofino" height="64" width="64" />
          <div className="ml-2">
            <p className="font-semibold">{room.name}</p>
            <p>หมายเลขการจอง {bookingNumber}</p>
          </div>
        </div>
        <p className="my-4 font-semibold text-lg">บัตรเครดิต/เดบิต</p>
        <Form
          form={modalForm}
          layout="vertical"
          autoComplete="off"
          onFinish={handleCardDetailForm}
        >
          <Form.Item
            label="หมายเลขบัตร"
            className="w-full"
            name="cardNumber"
            rules={[
              { required: true, message: "กรุณาระบุหมายเลขบัตร" },
              { validator: validateCardNumber }
            ]}
          >
            <Input
              className="h-[44px]"
              value={formattedNumber}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="ชื่อบนบัตร"
            className="w-full"
            name="cardName"
            rules={[{ required: true, message: "กรุณาระบุชื่อบนบัตร" }]}
          >
            <Input className="h-[44px]" />
          </Form.Item>
          <div className="flex gap-4">
            <Form.Item
              label="วันหมดอายุ"
              className="w-full"
              name="expire"
              rules={[
                { required: true, message: "กรุณาระบุวันหมดอายุ" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const unformattedValue = value.replace(/\D/g, ""); // Remove non-digits
                    if (unformattedValue.length === 4) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("วันหมดอายุต้องมีความยาว 4 ตัวอักษร")
                    );
                  },
                },
              ]}
            >
              <Input
                className="h-[44px]"
                placeholder="ดด/ปป"
                value={modalForm.getFieldValue("expire")}
                onChange={(e) => {
                  let input = e.target.value.replace(/\D/g, ""); // Remove non-digits
                  let month = input.substring(0, 2); // Extract the month part

                  // Allow deletion without enforcing format
                  if (input.length === 0) {
                    modalForm.setFieldsValue({ expire: "" });
                    return;
                  }

                  // Handle month input logic
                  if (month.length === 1 && month !== "0" && month !== "1") {
                    month = "0" + month; // If single digit, prepend '0'
                  } else if (month === "00") {
                    month = "01"; // Prevent '00', set it to '01'
                  } else if (parseInt(month, 10) > 12) {
                    month = "12"; // If month > 12, set it to '12'
                  }

                  // Limit the input to 4 digits for DD/YY format
                  input = month + input.substring(2, 4); // Ensure only 2 digits for year part (YY)
                  input = input.substring(0, 4);

                  // Format as DD/YY
                  let formattedInput = input;
                  if (input.length > 2) {
                    formattedInput =
                      input.substring(0, 2) + "/" + input.substring(2, 4);
                  }

                  modalForm.setFieldsValue({ expire: formattedInput });
                }}
              />
            </Form.Item>
            <Form.Item
              label="รหัสหลังบัตร"
              className="w-full"
              name="cardฺBackCode"
              rules={[
                { required: true, message: "กรุณาระบุรหัสหลังบัตร" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    if (value.length !== 3) {
                      return Promise.reject(
                        new Error("รหัสหลังบัตรต้องมีความยาว 3 ตัวอักษร")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                maxLength={3}
                className="h-[44px]"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  modalForm.setFieldsValue({ cardฺBackCode: value });
                }}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="ประเทศหรือภูมิภาค"
            name="country"
            rules={[{ required: true, message: "กรุณาระบุประเทศ" }]}
          >
            <Select placeholder={"-โปรดเลือก-"} className="h-[44px]">
              <Select.Option value="ประเทศไทย">ประเทศไทย</Select.Option>
              <Select.Option value="สิงคโปร์">สิงคโปร์</Select.Option>
              <Select.Option value="อเมริกา">อเมริกา</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Button
              type="primary"
              className="!rounded-md w-full h-[44px] font-semibold text-lg"
              htmlType="submit"
            >
              Pay {totalPrice} THB
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        centered
        open={openSuccessPaymentModal}
        onCancel={() => setOpenSuccessPaymentModal(false)}
        width={400}
        footer={null}
      >
        <div className="text-center bg-[#28a745] text-white p-2 mt-6 rounded-md">
          <p className="text-3xl">การจองสำเร็จ</p>
          <p className="text-xl">หมายเลขการจอง: {bookingNumber}</p>
        </div>
        <h2 className="my-2">การยืนยันการจอง</h2>
        <p>
          ลูกค้าสามารถปริ้นใบยืนยันการจองจากโรงแรมฉบับเต็มผ่านอีเมลยืนยัน
          หรือถ่ายภาพหน้าจอนี้ไว้เพื่อเป็นหลักฐานในการเช็คอินเข้าที่พักและสอบถามรายละเอียดเพื่มเติมได้ทางโทรศัพท์
          Tel: <u>044&nbsp;756&nbsp;558</u> (ติดต่อล็อบบี้)
        </p>
        <h2 className="my-2">รายการสรุปการจอง</h2>
        <div className="p-2 bg-gray-400 text-xl text-white rounded-md">
          Prices are in THB
        </div>
        <div className="text-sm mt-4 p-2 bg-[#f8f9fa] rounded-md">
          <p>{roomType?.type}</p>
          <p className="font-semibold">{numberOfGuests} ผู้ใหญ่</p>
          <p className="text-end">
            <span className="font-semibold mr-1">THB</span>
            <span>{totalPrice}</span>
          </p>
        </div>

        <div className="bg-[#EBE8E1] text-[#805d41] rounded-md mt-4 p-2 text-sm flex items-center justify-between">
          <p className="text-xl">ยอดสุทธิ</p>
          <div>
            <p className="text-end">
              THB <span className="text-3xl">{totalPrice}</span>
            </p>
            <p>รวมภาษีและค่าธรรมเนียม</p>
          </div>
        </div>
        <h2 className="text-[#28a745] text-center mt-2">
          ชำระผ่านบัตรเครดิต / เดบิตสำเร็จ
        </h2>
      </Modal>
      <Modal
        centered
        open={openFailedPaymentModal}
        onCancel={() => setOpenFailedPaymentModal(false)}
        width={400}
        footer={null}
      >
        <div className="text-center bg-red-600 text-white p-2 mt-6 rounded-md">
          <p className="text-3xl">การจองไม่สำเร็จ</p>
          <p className="text-xl">หมายเลขการจอง: {bookingNumber}</p>
        </div>
        <h2 className="text-red-500 text-center mt-2">
          ชำระผ่านบัตรเครดิต / เดบิตไม่สำเร็จ
        </h2>
      </Modal>
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
          form={form}
          name="reservation"
          layout="vertical"
          className="col-span-8 w-full bg-white rounded-md p-4"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <p className="text-xl mb-4">กรุณาใส่รายละเอียด</p>
          {/* กรุณาใส่รายละเอียด */}
          <div className="flex flex-col">
            <div className="flex gap-2 w-full">
              <div className="w-[300px] flex flex-shrink-0 gap-2">
                <Form.Item
                  name="prefix"
                  label="คำนำหน้า"
                  hasFeedback
                  rules={[{ required: true, message: "กรุณาเลือกคำนำหน้า" }]}
                  className={`w-[130px] form-item-container ${
                    prefix ? "success" : ""
                  }`}
                >
                  <Select
                    size="middle"
                    onChange={(value) => setPrefix(value)}
                    style={{
                      borderColor: prefix ? "#28a745" : "",
                    }}
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
                  hasFeedback
                  rules={[
                    { required: true, message: "กรุณาระบุชื่อ" },
                    {
                      max: 15,
                      message: "ชื่อต้องไม่เกิน 15 ตัวอักษร",
                    },
                  ]}
                >
                  <Input
                    size="middle"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Item>
              </div>
              <Form.Item
                className="w-full"
                label="นามสกุล"
                name="lastname"
                hasFeedback
                rules={[
                  { required: true, message: "กรุณาระบุนามสกุล" },
                  {
                    max: 15,
                    message: "นามสกุลต้องไม่เกิน 15 ตัวอักษร",
                  },
                ]}
              >
                <Input
                  size="middle"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className={`form-item-container ${
                  country ? "success" : ""
                } w-full`}
                label="ประเทศที่ออกหนังสือเดินทาง"
                name="country"
                hasFeedback
                rules={[{ required: true, message: "กรุณาระบุประเทศ" }]}
              >
                <Select
                  size="middle"
                  style={{ width: "100%" }}
                  placeholder={"-โปรดเลือก-"}
                  onChange={(value) => setCountry(value)}
                >
                  <Select.Option value="ประเทศไทย">ประเทศไทย</Select.Option>
                  <Select.Option value="สิงคโปร์">สิงคโปร์</Select.Option>
                  <Select.Option value="อเมริกา">อเมริกา</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex gap-2 w-full">
              <Form.Item
                className="w-[300px] flex-shrink-0"
                name="email"
                label="อีเมล"
                hasFeedback
                rules={[
                  { required: true, message: "กรุณาระบุอีเมล" },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "ต้องเป็นอีเมล @gmail.com เท่านั้น",
                  },
                ]}
              >
                <Input
                  size="middle"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="w-full"
                name="confirmEmail"
                label="อีเมล (ยืนยัน)"
                dependencies={["email"]}
                hasFeedback
                rules={[
                  { required: true, message: "กรุณายืนยันอีเมล" },
                  {
                    validator(_, value) {
                      if (!value || email === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("อีเมลไม่ตรงกัน"));
                    },
                  },
                ]}
              >
                <Input
                  size="middle"
                  onChange={(e) => setConfirmEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="w-full"
                name="tel"
                label="หมายเลขโทรศัพท์"
                hasFeedback
                rules={[
                  { required: true, message: "กรุณาระบุหมายเลขโทรศัพท์" },
                  { validator: validatePhoneNumber },
                ]}
              >
                <Input
                  size="middle"
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => setTel(e.target.value)}
                />
              </Form.Item>
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
          <h2 className="mt-12">ข้อตกลงและเงื่อนไขในการสำรองที่พัก</h2>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "กรุณายอบรับข้อตกลงและเงื่อนไขในการสำรองที่พัก"
                        )
                      ),
              },
            ]}
          >
            <Checkbox className="mt-2">
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
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              style={{
                backgroundColor: !isSubmitDisabled
                  ? "#db8056"
                  : "rgba(0, 0, 0, 0.04)",
                color: !isSubmitDisabled ? "#fff" : "rgba(0, 0, 0, 0.25)",
              }}
              className="mt-12 w-fit ml-auto block !rounded-md"
              disabled={isSubmitDisabled}
              htmlType="submit"
            >
              ดำเนินการต่อไปยังฟอร์มชำระเงินที่มีความปลอดภัย
            </Button>
          </Form.Item>
        </Form>
        {/* right-side */}
        <div className="sticky top-6 col-span-4 w-full h-fit bg-white rounded-md p-4 z-10">
          <p className="text-xl font-semibold mb-4">สรุปรายการจอง</p>
          <div className="flex items-center">
            <img
              src={room?.logo}
              alt="Hotel Portofino"
              height="64"
              width="64"
            />
            <div className="ml-2">
              <p className="text-sm font-semibold">{room?.name}</p>
              <p className="text-xs">เขาใหญ่, ประเทศไทย</p>
              <Rate
                disabled
                defaultValue={5}
                style={{
                  fontSize: ".85rem",
                }}
              />
            </div>
          </div>

          <div className="text-sm flex items-center">
            <span className="font-semibold mb-[1px]">{totalDay} คืน:</span>
            <span className="ml-1">{checkIn}</span>
            <span className="mx-1">-</span>
            <span>{checkOut}</span>
          </div>

          <div className="text-sm mt-4 p-2 bg-[#f8f9fa] rounded-md">
            <p>{roomType?.type}</p>
            <p className="font-semibold">{numberOfGuests} ผู้ใหญ่</p>
            <p className="text-end">
              <span className="font-semibold mr-1">THB</span>
              <span>{totalPrice}</span>
            </p>
          </div>

          <div className="bg-[#EBE8E1] text-[#805d41] rounded-md mt-4 p-2 text-sm flex items-center justify-between">
            <p className="text-xl">ยอดสุทธิ</p>
            <div>
              <p className="text-end">
                THB <span className="text-3xl">{totalPrice}</span>
              </p>
              <p>รวมภาษีและค่าธรรมเนียม</p>
            </div>
          </div>

          <div className="text-sm mt-4 border-b border-b-[#b6b7b9] flex justify-between pb-1">
            <p>ชำระเงินตอนนี้</p>
            <p>THB {totalPrice}</p>
          </div>
          <div className="text-sm flex justify-between pt-1">
            <p>ชำระเงินที่โรงแรม</p>
            <p>THB 0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
