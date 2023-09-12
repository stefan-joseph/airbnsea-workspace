"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourceTEST = exports.AppDataSourceDEV = exports.AppDataSourcePROD = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const listing_factory_1 = require("./src/db/seeding/factories/listing.factory");
const message_factory_1 = require("./src/db/seeding/factories/message.factory");
const user_factory_1 = require("./src/db/seeding/factories/user.factory");
const booking_factory_1 = require("./src/db/seeding/factories/booking.factory");
const initialSeed_1 = __importDefault(require("./src/db/seeding/seeds/initialSeed"));
const Booking_1 = require("./src/entity/Booking");
const Draft_1 = require("./src/entity/Draft");
const Listing_1 = require("./src/entity/Listing");
const Message_1 = require("./src/entity/Message");
const User_1 = require("./src/entity/User");
const optionsPROD = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Listing_1.Listing, Draft_1.Draft, Message_1.Message, Booking_1.Booking],
    migrations: [],
    subscribers: [],
    factories: [user_factory_1.UserFactory, listing_factory_1.ListingFactory, message_factory_1.MessageFactory, booking_factory_1.BookingFactory],
    seeds: [initialSeed_1.default],
};
exports.AppDataSourcePROD = new typeorm_1.DataSource(optionsPROD);
const optionsDEV = {
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "airbnb-clone",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Listing_1.Listing, Draft_1.Draft, Message_1.Message, Booking_1.Booking],
    migrations: [],
    subscribers: [],
    factories: [user_factory_1.UserFactory, listing_factory_1.ListingFactory, message_factory_1.MessageFactory, booking_factory_1.BookingFactory],
    seeds: [initialSeed_1.default],
};
exports.AppDataSourceDEV = new typeorm_1.DataSource(optionsDEV);
exports.AppDataSourceTEST = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "airbnb-clone-TEST",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [User_1.User, Listing_1.Listing, Draft_1.Draft, Message_1.Message, Booking_1.Booking],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map