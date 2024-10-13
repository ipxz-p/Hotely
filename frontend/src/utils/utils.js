import Payment from "payment";

export const removeAllNonDigit = (value) => {
    return value.replace(/\D+/g, ''); 
}

export const formatCreditCardNumber = (value) => {
    if (!value) return value;

    const issuer = Payment.fns.cardType(value);
    const clearValue = removeAllNonDigit(value);
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