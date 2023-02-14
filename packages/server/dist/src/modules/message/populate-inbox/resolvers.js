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
exports.resolvers = void 0;
const Message_1 = require("../../../entity/Message");
const getTypeormConnection_1 = require("../../../utils/getTypeormConnection");
const populateInboxQueryBuilder = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, getTypeormConnection_1.getTypeormConnection)()
        .getRepository(Message_1.Message)
        .createQueryBuilder("m")
        .distinctOn(["m.conversationId"])
        .orderBy("m.conversationId")
        .addOrderBy("m.createdDate", "DESC");
});
exports.resolvers = {
    MessageWithHost: {
        interlocutor: ({ userIdOfHost }, _, { userLoader }) => userLoader.load(userIdOfHost),
        userIdOfHost: () => null,
    },
    MessageWithGuest: {
        interlocutor: ({ userIdOfGuest }, _, { userLoader }) => userLoader.load(userIdOfGuest),
        userIdOfGuest: () => null,
    },
    Query: {
        populateGuestInbox: (_, __, { req: { session: { userId }, }, }) => __awaiter(void 0, void 0, void 0, function* () {
            const results = yield (yield populateInboxQueryBuilder())
                .where("m.userIdOfGuest = :userId", { userId })
                .getMany();
            results.sort((a, b) => Number(b.createdDate) - Number(a.createdDate));
            return results;
        }),
        populateHostInbox: (_, __, { req: { session: { userId }, }, }) => __awaiter(void 0, void 0, void 0, function* () {
            const results = yield (yield populateInboxQueryBuilder())
                .where("m.userIdOfHost = :userId", { userId })
                .getMany();
            results.sort((a, b) => Number(b.createdDate) - Number(a.createdDate));
            return results;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map