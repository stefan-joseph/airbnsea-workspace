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
const Listing_1 = require("../../../entity/Listing");
exports.resolvers = {
    Mutation: {
        createListing: (_, { input }, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(req.session);
            yield Listing_1.Listing.create(Object.assign(Object.assign({}, input), { imgUrl: "", userId: req.session.userId })).save();
            return true;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map