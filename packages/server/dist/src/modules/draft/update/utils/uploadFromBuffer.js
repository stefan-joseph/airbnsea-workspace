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
exports.uploadFromBuffer = void 0;
const node_1 = require("@graphql-yoga/node");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");
const uploadFromBuffer = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let uploadStream = cloudinary.v2.uploader.upload_stream({
            folder: "airbnsea",
            allowed_formats: ["jpg"],
            format: "jpg",
            width: "1200",
        }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                console.log("errorrrr", error);
                reject(new node_1.GraphQLYogaError((error === null || error === void 0 ? void 0 : error.message) || "Could not upload selected image"));
            }
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
});
exports.uploadFromBuffer = uploadFromBuffer;
//# sourceMappingURL=uploadFromBuffer.js.map