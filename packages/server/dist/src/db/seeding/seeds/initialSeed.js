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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const dayjs = require("dayjs");
const uuid_1 = require("uuid");
const User_1 = require("../../../entity/User");
const Listing_1 = require("../../../entity/Listing");
const Message_1 = require("../../../entity/Message");
class InitialSeeder {
    run(dataSource, factoryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const listingsRepository = dataSource.getRepository(Listing_1.Listing);
            const messagesRepository = dataSource.getRepository(Message_1.Message);
            const userFactory = factoryManager.get(User_1.User);
            const listingFactory = factoryManager.get(Listing_1.Listing);
            const messageFactory = factoryManager.get(Message_1.Message);
            const users = yield userFactory.saveMany(10);
            const listings = yield Promise.all(Array(100)
                .fill("")
                .map(() => __awaiter(this, void 0, void 0, function* () {
                const made = yield listingFactory.make({
                    user: faker_1.faker.helpers.arrayElement(users),
                });
                return made;
            })));
            yield listingsRepository.save(listings);
            listings.map((listing) => __awaiter(this, void 0, void 0, function* () {
                let guestUser;
                do {
                    guestUser = faker_1.faker.helpers.arrayElement(users);
                } while (guestUser.id === listing.userId);
                const hostUser = users.find((user) => user.id === listing.userId);
                const conversationId = (0, uuid_1.v4)();
                const message = yield messageFactory.make({
                    text: `Hello, I'm ${guestUser.firstName}`,
                    fromHost: false,
                    guestUser,
                    userIdOfGuest: guestUser.id,
                    hostUser,
                    userIdOfHost: hostUser.id,
                    listing,
                    listingId: listing.id,
                    conversationId,
                    createdDate: new Date(dayjs(Date.now()).subtract(2, "day").format()),
                });
                yield messagesRepository.save(message);
                const message2 = yield messageFactory.make({
                    text: `Hey there! I'm ${hostUser.firstName}`,
                    fromHost: true,
                    guestUser,
                    userIdOfGuest: guestUser.id,
                    hostUser,
                    userIdOfHost: hostUser.id,
                    listing,
                    listingId: listing.id,
                    conversationId,
                    createdDate: new Date(dayjs(Date.now()).subtract(1, "day").subtract(34, "minute").format()),
                });
                yield messagesRepository.save(message2);
                const message3 = yield messageFactory.make({
                    text: "Your place looks really nice!",
                    fromHost: false,
                    guestUser,
                    userIdOfGuest: guestUser.id,
                    hostUser,
                    userIdOfHost: hostUser.id,
                    listing,
                    listingId: listing.id,
                    conversationId,
                    createdDate: new Date(dayjs(Date.now()).subtract(1, "day").subtract(17, "minute").format()),
                });
                yield messagesRepository.save(message3);
            }));
        });
    }
}
exports.default = InitialSeeder;
//# sourceMappingURL=initialSeed.js.map