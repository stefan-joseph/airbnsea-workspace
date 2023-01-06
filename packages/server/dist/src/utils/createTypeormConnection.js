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
exports.createTypeormConnection = void 0;
const data_source_1 = require("../../data-source");
const createTypeormConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === "test") {
        return yield data_source_1.AppDataSourceTEST.initialize();
    }
    else if (process.env.NODE_ENV === "development") {
        console.log("NODE_ENV", process.env.NODE_ENV);
        return yield data_source_1.AppDataSourceDEV.initialize();
    }
    else {
        return yield data_source_1.AppDataSourcePROD.initialize();
    }
});
exports.createTypeormConnection = createTypeormConnection;
//# sourceMappingURL=createTypeormConnection.js.map