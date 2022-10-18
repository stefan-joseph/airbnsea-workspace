"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourceTEST = exports.AppDataSourceDEV = exports.AppDataSourcePROD = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSourcePROD = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
exports.AppDataSourceDEV = new typeorm_1.DataSource({
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "airbnb-clone",
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
exports.AppDataSourceTEST = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "airbnb-clone-TEST",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map