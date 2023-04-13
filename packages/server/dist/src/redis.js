"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? new ioredis_1.default()
    : new ioredis_1.default(process.env.REDIS_URL, {
        family: 6,
    });
//# sourceMappingURL=redis.js.map