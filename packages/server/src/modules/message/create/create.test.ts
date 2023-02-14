import validate = require("uuid-validate");
import { messageRequired } from "@airbnb-clone/common";

import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  testUser1,
  testUser2,
  testListing,
} from "../../shared/test-utils/testConstants";
import { formatBadUuidErrorMessage } from "../../shared/utils/errorMessages";
import { cannotMessageOwnListing } from "./utils/errorMessages";

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

describe("create message", () => {
  const client = new TestClient("graphql");

  test("host attempts to send message to own listing/send initial message", async () => {
    await client.login(testUser1.email, testUser1.password);
    const { errors } = await client.createMessage(listingId, "message");
    expect(errors[0].message).toEqual(cannotMessageOwnListing);
  });

  test("user attempts to send message to non-existent listing", async () => {
    await client.login(testUser2.email, testUser2.password);
    const { errors } = await client.createMessage(listingId + "a", "message");
    expect(errors[0].message).toEqual(formatBadUuidErrorMessage("listingId"));
  });

  test("user attempts to send empty message", async () => {
    const { errors } = await client.createMessage(listingId, "");
    expect(errors[0].message).toEqual(messageRequired);
  });

  test("guest successfully sends initial message", async () => {
    const message1 = "initial message";
    const { data } = await client.createMessage(listingId, message1);
    expect(validate(data.createMessage)).toEqual(true);
    const inbox = await client.populateGuestInbox();
    expect(inbox.data.populateGuestInbox[0].text).toEqual(message1);
  });

  test("host successfully responds to guest", async () => {
    await client.login(testUser1.email, testUser1.password);
    const message2 = "response message";
    const { data } = await client.createMessage(listingId, message2);
    expect(validate(data.createMessage)).toEqual(true);
    const inbox = await client.populateHostInbox();
    expect(inbox.data.populateHostInbox[0].text).toEqual(message2);
  });
});
