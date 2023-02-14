import "reflect-metadata";
import { runSeeders } from "typeorm-extension";

import { getTypeormConnection } from "../../utils/getTypeormConnection";

const dataSource = getTypeormConnection();

const seedDb = async () => {
  await runSeeders(dataSource);
};
seedDb();
process.exit();
