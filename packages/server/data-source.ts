import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./src/entity/User";

export const AppDataSourcePROD = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "",
  // database: "airbnb-clone",
  synchronize: true,
  logging: true,
  // dropSchema: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});

export const AppDataSourceDEV = new DataSource({
  name: "development",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "airbnb-clone",
  synchronize: true,
  logging: true,
  // dropSchema: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});

export const AppDataSourceTEST = new DataSource({
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
