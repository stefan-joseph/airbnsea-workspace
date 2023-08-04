import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
// import { faker } from "@faker-js/faker";
// import dayjs = require("dayjs");
// import { v4 as uuidv4 } from "uuid";

// import { User } from "../../../entity/User";
import { Listing } from "../../../entity/Listing";
// import { Message } from "../../../entity/Message";
// import { Booking } from "../../../entity/Booking";
// import {
//   calculateBookingCosts,
//   dateFormat,
//   getDayDifference,
// } from "@airbnb-clone/common";

export default class InitialSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const listingsRepository = dataSource.getRepository(Listing);
    // const messagesRepository = dataSource.getRepository(Message);
    // const bookingsRepository = dataSource.getRepository(Booking);

    // const userFactory = factoryManager.get(User);
    const listingFactory = factoryManager.get(Listing);
    // const messageFactory = factoryManager.get(Message);
    // const bookingFactory = factoryManager.get(Booking);

    // const users = await userFactory.saveMany(10);

    const listings = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const made = await listingFactory.make({
            // user: faker.helpers.arrayElement(users),
          });
          return made;
        })
    );
    await listingsRepository.save(listings);

    // listings.map(async (listing) => {
    //   let guestUser: User;

    //   do {
    //     guestUser = faker.helpers.arrayElement(users);
    //   } while (guestUser.id === listing.userId);

    //   const hostUser = users.find((user) => user.id === listing.userId);
    //   const conversationId = uuidv4();

    //   const message = await messageFactory.make({
    //     text: `Hello, I'm ${guestUser.firstName}`,
    //     fromHost: false,
    //     guestUser,
    //     userIdOfGuest: guestUser.id,
    //     hostUser,
    //     userIdOfHost: (hostUser as User).id,
    //     listing,
    //     listingId: listing.id,
    //     conversationId,
    //     createdDate: new Date(dayjs(Date.now()).subtract(2, "day").format()),
    //   });

    //   await messagesRepository.save(message);

    //   const message2 = await messageFactory.make({
    //     text: `Hey there! I'm ${(hostUser as User).firstName}`,
    //     fromHost: true,
    //     guestUser,
    //     userIdOfGuest: guestUser.id,
    //     hostUser,
    //     userIdOfHost: (hostUser as User).id,
    //     listing,
    //     listingId: listing.id,
    //     conversationId,
    //     createdDate: new Date(
    //       dayjs(Date.now()).subtract(1, "day").subtract(34, "minute").format()
    //     ),
    //   });

    //   await messagesRepository.save(message2);

    //   const message3 = await messageFactory.make({
    //     text: "Your place looks really nice!",
    //     fromHost: false,
    //     guestUser,
    //     userIdOfGuest: guestUser.id,
    //     hostUser,
    //     userIdOfHost: (hostUser as User).id,
    //     listing,
    //     listingId: listing.id,
    //     conversationId,
    //     createdDate: new Date(
    //       dayjs(Date.now()).subtract(1, "day").subtract(17, "minute").format()
    //     ),
    //   });

    //   await messagesRepository.save(message3);

    //   const start = dayjs(Date.now()).add(1, "month").format(dateFormat);

    //   const end = dayjs(start)
    //     .add(Math.floor(Math.random() * 10) + 1, "day")
    //     .format(dateFormat);

    //   const { serviceFee, taxes, total } = calculateBookingCosts(
    //     listing.price,
    //     getDayDifference(start, end)
    //   );

    //   const booking1 = await bookingFactory.make({
    //     range: `[${start}, ${end}]`,
    //     guests: Math.floor(Math.random() * listing.guests) + 1,
    //     pricePerNight: listing.price,
    //     serviceFee,
    //     taxes,
    //     total,
    //     user: guestUser,
    //     userId: guestUser.id,
    //     listing,
    //     listingId: listing.id,
    //   });

    //   await bookingsRepository.save(booking1);

    //   const start2 = dayjs(start).add(1, "month").format(dateFormat);

    //   const end2 = dayjs(start2)
    //     .add(Math.floor(Math.random() * 10) + 1, "day")
    //     .format(dateFormat);

    //   const {
    //     serviceFee: serviceFee2,
    //     taxes: taxes2,
    //     total: total2,
    //   } = calculateBookingCosts(listing.price, getDayDifference(start, end));

    //   const booking2 = await bookingFactory.make({
    //     range: `[${start2}, ${end2}]`,
    //     guests: Math.floor(Math.random() * listing.guests) + 1,
    //     pricePerNight: listing.price,
    //     serviceFee: serviceFee2,
    //     taxes: taxes2,
    //     total: total2,
    //     user: guestUser,
    //     userId: guestUser.id,
    //     listing,
    //     listingId: listing.id,
    //   });

    //   await bookingsRepository.save(booking2);
    // });
  }
}
