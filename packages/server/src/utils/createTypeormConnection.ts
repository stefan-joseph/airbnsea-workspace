import {
  AppDataSourceDEV,
  AppDataSourceTEST,
  AppDataSourcePROD,
} from "../../data-source";

export const createTypeormConnection = async () => {
  if (process.env.NODE_ENV === "test") {
    return await AppDataSourceTEST.initialize();
  } else if (process.env.NODE_ENV === "production") {
    return await AppDataSourcePROD.initialize();
  } else {
    return await AppDataSourceDEV.initialize();
  }
};
