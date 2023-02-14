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
exports.resolvers = {
    Mutation: {
        addFruit: (_, { fruit }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(fruit);
            yield redis.set("fruit", fruit + "!");
            return true;
        }),
    },
    Query: {
        getFruit: (_, __, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const fruit = yield redis.get("fruit");
            if (fruit)
                return fruit;
            return "";
        }),
    },
};
//# sourceMappingURL=resolvers.js.map