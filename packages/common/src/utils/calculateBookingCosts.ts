export const calculateBookingCosts = (
  price: number,
  lengthOfStay: number,
  serviceRate: number = 0.1,
  taxRate: number = 0.15
) => {
  const subTotal = lengthOfStay * price;
  const serviceFee = Math.round(subTotal * serviceRate);
  const taxes = Math.round(subTotal * taxRate);
  const total = subTotal + serviceFee + taxes;

  return {
    serviceFee,
    taxes,
    total,
  };
};
