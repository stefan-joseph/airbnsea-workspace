import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import dayjs = require("dayjs");
import { v4 as uuidv4 } from "uuid";

import { User } from "../../../entity/User";
import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";

export default class InitialSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const listingsRepository = dataSource.getRepository(Listing);
    const messagesRepository = dataSource.getRepository(Message);

    const userFactory = factoryManager.get(User);
    const listingFactory = factoryManager.get(Listing);
    const messageFactory = factoryManager.get(Message);

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

    listings.map(async (listing) => {
      let guestUser: User;

      do {
        guestUser = faker.helpers.arrayElement(users);
      } while (guestUser.id === listing.userId);

      const hostUser = users.find((user) => user.id === listing.userId);
      const conversationId = uuidv4();

      const message = await messageFactory.make({
        text: `Hello, I'm ${guestUser.firstName}`,
        fromHost: false,
        guestUser,
        userIdOfGuest: guestUser.id,
        hostUser,
        userIdOfHost: (hostUser as User).id,
        listing,
        listingId: listing.id,
        conversationId,
        createdDate: new Date(dayjs(Date.now()).subtract(2, "day").format()),
      });

      await messagesRepository.save(message);

      const message2 = await messageFactory.make({
        text: `Hey there! I'm ${(hostUser as User).firstName}`,
        fromHost: true,
        guestUser,
        userIdOfGuest: guestUser.id,
        hostUser,
        userIdOfHost: (hostUser as User).id,
        listing,
        listingId: listing.id,
        conversationId,
        createdDate: new Date(
          dayjs(Date.now()).subtract(1, "day").subtract(34, "minute").format()
        ),
      });

      await messagesRepository.save(message2);

      const message3 = await messageFactory.make({
        text: "Your place looks really nice!",
        fromHost: false,
        guestUser,
        userIdOfGuest: guestUser.id,
        hostUser,
        userIdOfHost: (hostUser as User).id,
        listing,
        listingId: listing.id,
        conversationId,
        createdDate: new Date(
          dayjs(Date.now()).subtract(1, "day").subtract(17, "minute").format()
        ),
      });

      await messagesRepository.save(message3);
    });
  }
}
