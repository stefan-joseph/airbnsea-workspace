import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import { User } from "../../../entity/User";
import { Listing } from "../../../entity/Listing";

export default class InitialSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // const usersRepository = dataSource.getRepository(User);
    const listingsRepository = dataSource.getRepository(Listing);

    const userFactory = factoryManager.get(User);
    const listingFactory = factoryManager.get(Listing);

    const users = await userFactory.saveMany(10);

    const listings = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const made = await listingFactory.make({
            user: faker.helpers.arrayElement(users),
          });
          return made;
        })
    );
    await listingsRepository.save(listings);

    // create message for each listing
  }
}
