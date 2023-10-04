import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { ListingFactory } from "./src/db/seeding/factories/listing.factory";
import { MessageFactory } from "./src/db/seeding/factories/message.factory";
import { UserFactory } from "./src/db/seeding/factories/user.factory";
import { BookingFactory } from "./src/db/seeding/factories/booking.factory";
import InitialSeeder from "./src/db/seeding/seeds/initialSeed";
import { Booking } from "./src/entity/Booking";
import { Draft } from "./src/entity/Draft";
import { Listing } from "./src/entity/Listing";
import { Message } from "./src/entity/Message";
import { User } from "./src/entity/User";

const optionsPROD: DataSourceOptions & SeederOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false },
  synchronize: true,
  logging: false,
  dropSchema: false,
  entities: [User, Listing, Draft, Message, Booking],
  migrations: [],
  subscribers: [],
  factories: [UserFactory, ListingFactory, MessageFactory, BookingFactory],
  seeds: [InitialSeeder],
};

export const AppDataSourcePROD = new DataSource(optionsPROD);

const optionsDEV: DataSourceOptions & SeederOptions = {
  name: "development",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "airbnb-clone",
  synchronize: true,
  logging: false,
  dropSchema: false,
  entities: [User, Listing, Draft, Message, Booking],
  migrations: [],
  subscribers: [],
  // additional config options brought by typeorm-extension
  factories: [UserFactory, ListingFactory, MessageFactory, BookingFactory],
  seeds: [InitialSeeder],
};

export const AppDataSourceDEV = new DataSource(optionsDEV);

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
  entities: [User, Listing, Draft, Message, Booking],
  migrations: [],
  subscribers: [],
});
