export declare const calculateBookingCosts: (price: number, lengthOfStay: number, serviceRate?: number, taxRate?: number) => {
    serviceFee: number;
    taxes: number;
    total: number;
};
