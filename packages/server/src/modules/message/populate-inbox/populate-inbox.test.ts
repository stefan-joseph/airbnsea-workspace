import validate = require("uuid-validate");

import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  testUser1,
  testUser2,
  testListing,
} from "../../shared/test-utils/testConstants";

let userId1: string;
let listingId: string;

beforeAll(async () => {
  await createTypeormConnection();

  const user1 = await User.create({
    ...testUser1,
    confirmed: true,
  }).save();
  userId1 = user1.id;

  await User.create({
    ...testUser2,
    confirmed: true,
  }).save();

  const listing = await Listing.create({
    ...testListing,
    userId: userId1,
  }).save();

  listingId = listing.id;
});

describe("populate inbox", () => {
  const client = new TestClient("graphql");
  const message1 = "first message";
  test("guest sends message to host and populates inbox", async () => {
    await client.login(testUser2.email, testUser2.password);
    await client.createMessage(listingId, message1);
    const inbox = await client.populateGuestInbox();
    expect(inbox.data.populateGuestInbox.length).toEqual(1);
    const { text, userIdOfHost, conversationId } =
      inbox.data.populateGuestInbox[0];
    expect(text).toEqual(message1);
    expect(userIdOfHost).toBeNull();
    expect(validate(conversationId)).toEqual(true);
    const { firstName, lastName, avatar } = testUser1;
    expect(inbox.data.populateGuestInbox[0].interlocutor).toEqual({
      firstName,
      lastName,
      avatar,
    });
  });

  test("host receives guest's message and populates inbox", async () => {
    await client.login(testUser1.email, testUser1.password);
    const inbox = await client.populateHostInbox();
    expect(inbox.data.populateHostInbox.length).toEqual(1);
    const { text, interlocutor, userIdOfGuest } =
      inbox.data.populateHostInbox[0];
    expect(text).toEqual(message1);
    expect(userIdOfGuest).toBeNull();
    const { firstName, lastName, avatar } = testUser2;
    expect(interlocutor).toEqual({
      firstName,
      lastName,
      avatar,
    });
  });

  const message2 = "second message";
  test("host replies to guest and populates inbox", async () => {
    await client.createMessage(listingId, message2);
    const inbox = await client.populateHostInbox();
    expect(inbox.data.populateHostInbox[0].text).toEqual(message2);
  });

  test("guest receives host's message and populates inbox", async () => {
    await client.login(testUser2.email, testUser2.password);
    const inbox = await client.populateGuestInbox();
    expect(inbox.data.populateGuestInbox[0].text).toEqual(message2);
  });
});
