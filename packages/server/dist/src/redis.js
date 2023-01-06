"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? new ioredis_1.default()
    : new ioredis_1.default("redis://default:af5ac0df2e664a568c4052560f4f68e5@fly-airbnsea-redis.upstash.io", {
        family: 6,
    });
//# sourceMappingURL=redis.js.map