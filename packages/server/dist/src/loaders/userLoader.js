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
exports.userLoader = void 0;
const User_1 = require("../entity/User");
const DataLoader = require("dataloader");
const typeorm_1 = require("typeorm");
const batchUsers = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.findBy({ id: (0, typeorm_1.In)(ids) });
    const userMap = {};
    users.forEach((user) => {
        userMap[user.id] = user;
    });
    return ids.map((id) => userMap[id]);
});
const userLoader = () => new DataLoader((keys) => batchUsers(keys));
exports.userLoader = userLoader;
//# sourceMappingURL=userLoader.js.map