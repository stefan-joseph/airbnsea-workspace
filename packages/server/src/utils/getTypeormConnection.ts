import {
  AppDataSourceDEV,
  AppDataSourcePROD,
  AppDataSourceTEST,
} from "../../data-source";

export const getTypeormConnection = () => {
  if (process.env.NODE_ENV === "test") return AppDataSourceTEST;
  else if (process.env.NODE_ENV === "development") return AppDataSourceDEV;
  else return AppDataSourcePROD;
};
