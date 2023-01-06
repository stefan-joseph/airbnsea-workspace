"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = exports.guestsValidation = exports.dateValidation = exports.maxGuests = exports.minGuests = exports.invalidLengthOfStay = exports.invalidDate = void 0;
const yup = __importStar(require("yup"));
const dayjs = require("dayjs");
const constants_1 = require("../constants/constants");
exports.invalidDate = "Invalid date";
exports.invalidLengthOfStay = "Must stay a minimum of 1 night";
exports.minGuests = "At least 1 guest is required";
exports.maxGuests = "Limited to 16 guests";
exports.dateValidation = yup
    .string()
    .required("Required")
    .test("is_correct_date_format", exports.invalidDate, (value) => dayjs(value, constants_1.dateFormat, true).isValid())
    .test("is_before_current_date", exports.invalidDate, (value) => dayjs(value).isAfter(new Date(), "day") ||
    dayjs(value).isSame(new Date(), "day"));
exports.guestsValidation = yup
    .number()
    .required("Required")
    .min(1, exports.minGuests)
    .max(16, exports.maxGuests);
exports.bookingSchema = yup.object().shape({
    start: exports.dateValidation,
    end: exports.dateValidation.test("is_after_start", exports.invalidLengthOfStay, function (value) {
        return dayjs(value).isAfter(this.parent.start);
    }),
    guests: exports.guestsValidation,
});
//# sourceMappingURL=booking.js.map