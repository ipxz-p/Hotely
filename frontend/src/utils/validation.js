import Payment from "payment";
import { removeAllNonDigit } from "./utils";

export const validatePhoneNumber = (_, value) => {
  const phonePattern = /^0[0-9]{9}$/;
  if (!value) {
    return Promise.resolve();
  }
  if (phonePattern.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("หมายเลขโทรศัพท์ไม่ถูกต้อง"));
};

export const validateEmailMatch = (email) => ({
  validator(_, value) {
    if (!value || email === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("อีเมลไม่ตรงกัน"));
  },
});

export const validateCardNumber = (_, value) => {
  if (!value) return Promise.resolve();
  const clearValue = removeAllNonDigit(value);
  const isValid = Payment.fns.validateCardNumber(clearValue);
  return isValid
    ? Promise.resolve()
    : Promise.reject(new Error("หมายเลขบัตรไม่ถูกต้อง"));
};
