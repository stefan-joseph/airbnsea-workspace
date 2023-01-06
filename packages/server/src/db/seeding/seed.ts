import "reflect-metadata";
import {
  runSeeders,
  //  ,SeederOptions
} from "typeorm-extension";
// import { DataSource, DataSourceOptions } from "typeorm";
// import { User } from "./users.entity";
// import { Post } from "./posts.entity";
// import { UsersFactory } from "./users.factory";
// import { PostsFactory } from "./users.factory";
// import { MainSeeder } from "./main.seeder";
import { getTypeormConnection } from "../../utils/getTypeormConnection";

const dataSource = getTypeormConnection();

const seedDb = async () => {
  await runSeeders(dataSource);
};
seedDb();
process.exit();

// dataSource.initialize().then(async () => {
//   await dataSource.synchronize(true);
//   await runSeeders(dataSource);
//   process.exit();
// });
