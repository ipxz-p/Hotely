import { Form } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../axios";
import { formatCreditCardNumber } from "../../utils/utils";
import { validateCardNumber } from "../../utils/validation";

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

  // Fetch room and room type details
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

  const handleSubmit = () => {
    const generateBookingNumber = () => {
      return Math.floor(1000000 + Math.random() * 9000000).toString();
    };

    setBookingNumber(generateBookingNumber());
    setOpenCardDetailModal(true);
  };

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

  const handleCardDetailForm = async () => {
    try {
      await modalForm.validateFields();
      const cardNumber = modalForm.getFieldValue("cardNumber");
      const isCardNumberValid = validateCardNumber(cardNumber);
      const expire = modalForm.getFieldValue("expire");
      const expiryDate = moment(expire, "MM/YY");
      const isExpire = expiryDate.isBefore(moment(), "month")
      const { data } = await api(`/blacklist/getBlacklistByCardBlacklist/${cardNumber}`);
      
      setOpenCardDetailModal(false);
      if (!isCardNumberValid || isExpire || typeof data === "object") {
        setOpenFailedPaymentModal(true);
      } else {
        setOpenSuccessPaymentModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatCreditCardNumber(value);
    setFormattedNumber(formattedValue);
    modalForm.setFieldsValue({
      cardNumber: formattedValue,
    });
  };

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
    prefix,
    setPrefix,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    country,
    setCountry,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    tel,
    setTel,
    consent,
    setConsent,
    isSubmitDisabled,
    setIsSubmitDisabled,
    totalPrice,
    bookingNumber,
    setBookingNumber,
    openCardDetailModal,
    setOpenCardDetailModal,
    openSuccessPaymentModal,
    setOpenSuccessPaymentModal,
    openFailedPaymentModal,
    setOpenFailedPaymentModal,
    formattedNumber,
    setFormattedNumber,
    handleSubmit,
    handleCardDetailForm,
    handleInputChange,
  };
};
