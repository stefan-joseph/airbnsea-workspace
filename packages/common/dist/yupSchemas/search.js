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
exports.searchSchema = exports.guestsValidationForSearch = exports.dateValidationForSearch = void 0;
const yup = __importStar(require("yup"));
const dayjs = require("dayjs");
const constants_1 = require("../constants/constants");
const invalidDate = "Invalid date";
const invalidLengthOfStay = "Must stay a minimum of 1 night";
const minGuests = "At least 1 guest is required";
const maxGuests = "Limited to 16 guests";
exports.dateValidationForSearch = yup
    .string()
    .test("is_correct_date_format", invalidDate, (value) => !value || dayjs(value, constants_1.dateFormat, true).isValid())
    .test("is_before_current_date", invalidDate, (value) => !value ||
    dayjs(value).isAfter(new Date(), "day") ||
    dayjs(value).isSame(new Date(), "day"))
    .nullable();
exports.guestsValidationForSearch = yup
    .number()
    .min(1, minGuests)
    .max(16, maxGuests)
    .nullable();
exports.searchSchema = yup.object().shape({
    start: exports.dateValidationForSearch,
    end: exports.dateValidationForSearch.test("is_after_start", invalidLengthOfStay, function (value) {
        return (!value || !this.parent.start || dayjs(value).isAfter(this.parent.start));
    }),
    guests: exports.guestsValidationForSearch,
    where: yup.string().nullable(),
});
//# sourceMappingURL=search.js.map