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
const types_1 = require("../../../types/types");
const getTypeormConnection_1 = require("../../../utils/getTypeormConnection");
exports.resolvers = {
    InboxMessage: {
        interlocutor: ({ interlocutorId }, _, { userLoader }) => userLoader.load(interlocutorId),
        interlocutorId: () => null,
    },
    Query: {
        populateInbox: (_, { inboxType }, { req: { session: { userId }, }, }) => __awaiter(void 0, void 0, void 0, function* () {
            let query = (0, getTypeormConnection_1.getTypeormConnection)()
                .getRepository(Message_1.Message)
                .createQueryBuilder("m")
                .distinctOn(["m.conversationId"])
                .orderBy("m.conversationId")
                .addOrderBy("m.createdDate", "DESC");
            if (inboxType === types_1.InboxType.Guest) {
                console.log("is guest???");
                query.where("m.userIdOfGuest = :userId", { userId });
            }
            else {
                query.where("m.userIdOfHost = :userId", { userId });
            }
            const results = yield query.getMany();
            const modifiedResults = results
                .sort((a, b) => Number(b.createdDate) - Number(a.createdDate))
                .map((message) => (Object.assign(Object.assign({}, message), { interlocutorId: inboxType === types_1.InboxType.Guest
                    ? message.userIdOfHost
                    : message.userIdOfGuest })));
            console.log("results", modifiedResults);
            return modifiedResults;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map