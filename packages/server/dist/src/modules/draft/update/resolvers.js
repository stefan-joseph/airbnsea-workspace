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
const cloudinary = require("cloudinary");
const getTypeormConnection_1 = require("../../../utils/getTypeormConnection");
const Draft_1 = require("../../../entity/Draft");
const formatGraphQLYogaError_1 = require("../../shared/utils/formatGraphQLYogaError");
const uploadFromBuffer_1 = require("./utils/uploadFromBuffer");
exports.resolvers = {
    Mutation: {
        updateListing: (_, { listingId, fields }) => __awaiter(void 0, void 0, void 0, function* () {
            const { vesselType, address, name, photos } = fields;
            let typeormConnection = (0, getTypeormConnection_1.getTypeormConnection)();
            let queryBuilder = typeormConnection
                .createQueryBuilder()
                .update(Draft_1.Draft)
                .where("id = :id", { id: listingId })
                .returning("id");
            if (vesselType)
                queryBuilder.set({ vesselType });
            if (address)
                queryBuilder.set(Object.assign({}, address));
            if (name)
                queryBuilder.set({ name });
            if (photos) {
                const { photoToAdd, photoToDelete } = photos;
                if (photoToAdd) {
                    let [type, ext] = photoToAdd.type.split("/");
                    if (type !== "image") {
                        return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(`file must be an image, not ${type}.`);
                    }
                    if (ext === "octet-stream")
                        ext = "jpeg";
                    const { photos: currentPhotos } = yield Draft_1.Draft.findOneOrFail({
                        where: { id: listingId },
                        select: { photos: true },
                    });
                    if (!photoToAdd.arrayBuffer)
                        return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)("The uploaded file is not the proper image format");
                    const arrayBuffer = yield photoToAdd.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const result = yield (0, uploadFromBuffer_1.uploadFromBuffer)(buffer);
                    queryBuilder.set({
                        photos: [...currentPhotos, result.secure_url.split("upload/")[1]],
                    });
                }
                else if (photoToDelete) {
                    const { photos: currentPhotos } = yield Draft_1.Draft.findOneOrFail({
                        where: { id: listingId },
                        select: { photos: true },
                    });
                    const publicId = "airbnsea/" + photoToDelete.split("airbnsea/")[1].split(".")[0];
                    const { result } = yield cloudinary.v2.uploader
                        .destroy(`${publicId}`)
                        .catch((error) => (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(error.message));
                    if (result !== "ok")
                        return (0, formatGraphQLYogaError_1.formatGraphQLYogaError)(result);
                    const newPhotos = currentPhotos.filter((img) => img !== photoToDelete.split("upload/")[1]);
                    queryBuilder.set({ photos: newPhotos });
                }
            }
            const { raw: [listing], } = yield queryBuilder.execute();
            return listing.id;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map