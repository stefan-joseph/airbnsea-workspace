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
require("reflect-metadata");
const typeorm_extension_1 = require("typeorm-extension");
const getTypeormConnection_1 = require("../../utils/getTypeormConnection");
const dataSource = (0, getTypeormConnection_1.getTypeormConnection)();
const seedDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_extension_1.runSeeders)(dataSource);
});
seedDb();
process.exit();
//# sourceMappingURL=seed.js.map