"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayDifference = void 0;
const dayjs = require("dayjs");
const getDayDifference = (start, end) => dayjs(end).diff(dayjs(start), "day");
exports.getDayDifference = getDayDifference;
//# sourceMappingURL=getDayDifference.js.map