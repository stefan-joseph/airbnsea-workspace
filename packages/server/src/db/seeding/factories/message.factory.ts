import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Message } from "../../../entity/Message";

export const MessageFactory = setSeederFactory(Message, (faker: Faker) => {
  console.log(faker);

  const message = new Message();

  // message.text = "Hello";
  // message.fromHost;

  message.userIdOfGuest;
  message.userIdOfHost;
  message.listingId;

  return message;
});
