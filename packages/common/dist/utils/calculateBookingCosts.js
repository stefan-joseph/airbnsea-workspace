"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBookingCosts = void 0;
const calculateBookingCosts = (price, lengthOfStay, serviceRate = 0.1, taxRate = 0.15) => {
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
exports.calculateBookingCosts = calculateBookingCosts;
//# sourceMappingURL=calculateBookingCosts.js.map