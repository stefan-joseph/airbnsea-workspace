"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeormConnection = void 0;
const data_source_1 = require("../../data-source");
const getTypeormConnection = () => {
    if (process.env.NODE_ENV === "test")
        return data_source_1.AppDataSourceTEST;
    else if (process.env.NODE_ENV === "development")
        return data_source_1.AppDataSourceDEV;
    else
        return data_source_1.AppDataSourcePROD;
};
exports.getTypeormConnection = getTypeormConnection;
//# sourceMappingURL=getTypeormConnection.js.map