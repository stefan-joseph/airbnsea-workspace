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
const errorMessages_1 = require("../../shared/utils/errorMessages");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const constants_1 = require("../../shared/utils/constants");
exports.resolvers = {
    Listing: {
        photos: ({ photos }) => photos.map((url) => constants_1.imageUrl + url),
        owner: ({ userId }, _, { userLoader }) => __awaiter(void 0, void 0, void 0, function* () { return userLoader.load(userId); }),
        userId: () => null,
    },
    Query: {
        viewListing: (_, { listingId }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield Listing_1.Listing.findOneBy({ id: listingId });
            if (!listing) {
                return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)((0, errorMessages_1.formatNotFoundWithGivenIdErrorMessage)("listing", listingId));
            }
            return listing;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map