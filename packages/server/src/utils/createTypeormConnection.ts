// import { runSeeders } from "typeorm-extension";
import {
  AppDataSourceDEV,
  AppDataSourceTEST,
  AppDataSourcePROD,
} from "../../data-source";

export const createTypeormConnection = async () => {
  if (process.env.NODE_ENV === "test") {
    return await AppDataSourceTEST.initialize();
  } else if (process.env.NODE_ENV === "development") {
    return await AppDataSourceDEV.initialize();
    // .then(async () => {
    //   await AppDataSourceDEV.synchronize(true);
    //   await runSeeders(AppDataSourceDEV);
    // });
  } else {
    return await AppDataSourcePROD.initialize();
  }
};
