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
const getTypeormConnection_1 = require("../../../utils/getTypeormConnection");
exports.resolvers = {
    Draft: {
        photos: ({ photos }) => photos.map((url) => "https://res.cloudinary.com/stefandevelops/image/upload/" + url),
    },
    Query: {
        populateForm: (_, { listingId, fields }) => __awaiter(void 0, void 0, void 0, function* () {
            let select = ["draft.id"];
            fields.forEach((field) => select.push(`draft.${field}`));
            let typeormConnection = (0, getTypeormConnection_1.getTypeormConnection)();
            const listing = yield typeormConnection
                .getRepository(Draft_1.Draft)
                .createQueryBuilder("draft")
                .where("draft.id = :id", { id: listingId })
                .select(select)
                .getOneOrFail();
            return listing;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map