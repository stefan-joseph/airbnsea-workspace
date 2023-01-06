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
const Draft_1 = require("../../../entity/Draft");
exports.resolvers = {
    Mutation: {
        createListing: (_, { input: { vesselType } }, { req: { session } }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield Draft_1.Draft.create({
                vesselType,
                userId: session.userId,
            }).save();
            return listing.id;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map