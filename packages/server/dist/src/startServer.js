"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
require("dotenv/config");
const node_1 = require("@graphql-yoga/node");
const createTypeormConnection_1 = require("./utils/createTypeormConnection");
const redis_1 = require("./redis");
const confirmEmail_1 = require("./routes/confirmEmail");
const constants_1 = require("./utils/constants");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const express = require("express");
const generateModularSchema_1 = require("./utils/generateModularSchema");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const app = express();
const SESSION_SECRET = "mdsnkjavnasdjv";
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(session({
        store: new RedisStore({ client: redis_1.redis, prefix: constants_1.redisSessionPrefix }),
        name: "qid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    const yoga = (0, node_1.createServer)({
        schema: (0, generateModularSchema_1.generateModularSchema)(),
        context: ({ request }) => ({
            redis: redis_1.redis,
            url: request.url,
        }),
    });
    app.use("/graphql", yoga);
    const corsOptions = {
        credentials: true,
        origin: process.env.NODE_ENV === "test" ? "*" : process.env.FRONTEND_HOST,
    };
    app.use(cors(corsOptions));
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        store: new rate_limit_redis_1.default({
            sendCommand: (...args) => redis_1.redis.call(...args),
        }),
    });
    app.use(limiter);
    yield (0, createTypeormConnection_1.createTypeormConnection)();
    app.get("/", (_, res) => {
        res.send("Hello World!");
    });
    app.get("/confirm-email/:id", confirmEmail_1.confirmEmail);
    const port = process.env.PORT || 4000;
    yield app.listen(port);
    console.log(`server is running on port ${port}`);
});
exports.startServer = startServer;
//# sourceMappingURL=startServer.js.map