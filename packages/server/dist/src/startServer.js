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
const redis_event_target_1 = require("@graphql-yoga/redis-event-target");
const ioredis_1 = __importDefault(require("ioredis"));
const typeorm_extension_1 = require("typeorm-extension");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const cloudinary = require("cloudinary");
const express = require("express");
const graphql_middleware_1 = require("graphql-middleware");
const cors = require("cors");
const expressSession = require("express-session");
const RedisStore = require("connect-redis")(expressSession);
const constants_1 = require("./utils/constants");
const redis_1 = require("./redis");
const generateModularSchema_1 = require("./utils/generateModularSchema");
const middleware_1 = require("./middleware/middleware");
const userLoader_1 = require("./loaders/userLoader");
const getTypeormConnection_1 = require("./utils/getTypeormConnection");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    app.use(expressSession({
        store: new RedisStore({ client: redis_1.redis, prefix: constants_1.redisSessionPrefix }),
        name: "qid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
    }));
    const schema = (0, generateModularSchema_1.generateModularSchema)();
    const schemaWithMiddleware = (0, graphql_middleware_1.applyMiddleware)(schema, middleware_1.authMiddleware, middleware_1.listingIdMiddleware);
    const publishClient = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? new ioredis_1.default()
        : new ioredis_1.default(process.env.REDIS_URL, {
            family: 6,
        });
    const subscribeClient = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? new ioredis_1.default()
        : new ioredis_1.default(process.env.REDIS_URL, {
            family: 6,
        });
    const eventTarget = (0, redis_event_target_1.createRedisEventTarget)({
        publishClient,
        subscribeClient,
    });
    const pubSub = (0, node_1.createPubSub)({ eventTarget });
    yield (0, getTypeormConnection_1.getTypeormConnection)()
        .initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, getTypeormConnection_1.getTypeormConnection)().synchronize(true);
        yield (0, typeorm_extension_1.runSeeders)((0, getTypeormConnection_1.getTypeormConnection)());
    }));
    const yoga = (0, node_1.createServer)({
        schema: schemaWithMiddleware,
        context: ({ request }) => ({
            redis: redis_1.redis,
            url: request.url,
            userLoader: (0, userLoader_1.userLoader)(),
            pubSub,
        }),
    });
    app.use("/graphql", yoga);
    const corsOptions = {
        credentials: true,
        origin: "*",
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
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    app.set("trust proxy", 1);
    app.get("/", (_, res) => res.redirect("/graphql"));
    const port = 8080;
    console.log(`running app on port ${port}`);
    yield app.listen(port);
});
exports.startServer = startServer;
//# sourceMappingURL=startServer.js.map