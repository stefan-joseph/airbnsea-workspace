import validate = require("uuid-validate");
import { v4 as uuidv4 } from "uuid";
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
import {
  formatBadUuidErrorMessage,
  formatNotFoundWithGivenIdErrorMessage,
  unauthenticatedErrorMessage,
} from "../../shared/utils/errorMessages";
import { cannotStartConversationWithOwnListing } from "./utils/errorMessages";
import { InboxType } from "../../../types/types";

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

describe("create conversation", () => {
  const client = new TestClient("graphql");

  test("unauthenticated user attempts to start conversation", async () => {
    const { errors } = await client.createConversation(listingId, "message");

    expect(errors[0].message).toEqual(unauthenticatedErrorMessage);
  });

  test("host attempts to start conversation with own listing", async () => {
    await client.login(testUser1.email, testUser1.password);
    const { errors } = await client.createConversation(listingId, "message");
    expect(errors[0].message).toEqual(cannotStartConversationWithOwnListing);
  });

  test("guest attempts to start conversation with bad listing id", async () => {
    await client.login(testUser2.email, testUser2.password);
    const { errors } = await client.createConversation(
      listingId + "a",
      "message"
    );
    expect(errors[0].message).toEqual(formatBadUuidErrorMessage("listingId"));
  });

  test("guest attempts to start conversation with non-existent listing id", async () => {
    const badlistingId = uuidv4();
    const { errors } = await client.createConversation(badlistingId, "message");
    expect(errors[0].message).toEqual(
      formatNotFoundWithGivenIdErrorMessage("listing", badlistingId)
    );
  });

  test("guest attempts to start conversation with empty message", async () => {
    const { errors } = await client.createConversation(listingId, "");
    expect(errors[0].message).toEqual(messageRequired);
  });

  let conversationId: string;
  const message1 = "initial message";

  test("guest successfully starts conversation with host", async () => {
    const { data } = await client.createConversation(listingId, message1);

    const { conversationId: conversationIdResponse } = data.createConversation;

    expect(validate(conversationIdResponse)).toEqual(true);

    conversationId = conversationIdResponse;

    const inbox = await client.populateInbox(InboxType.Guest);

    expect(inbox.data.populateInbox.length).toEqual(1);

    const {
      text,
      fromHost,
      conversationId: responseConversationId,
      interlocutor,
    } = inbox.data.populateInbox[0];

    expect(text).toEqual(message1);
    expect(fromHost).toEqual(false);
    expect(responseConversationId).toEqual(conversationId);

    // remove this? tested on populate tests
    const { avatar, firstName, lastName } = testUser1;
    expect(interlocutor).toEqual({
      avatar,
      firstName,
      lastName,
    });
  });

  test("guest attempts to start another conversation with same listing and is sent appropriate redirect url", async () => {
    const messageAttempt = "second attempt";
    const { data } = await client.createConversation(listingId, messageAttempt);

    expect(data.createConversation.redirect).toEqual(
      (process.env.FRONTEND_HOST as string) +
        `/inbox/${conversationId}?text=${messageAttempt}`
    );

    const inbox = await client.populateInbox(InboxType.Guest);

    expect(inbox.data.populateInbox.length).toEqual(1);
    expect(inbox.data.populateInbox[0].text).toEqual(message1);
  });

  test("conversation is succesfully initiated with host", async () => {
    await client.login(testUser1.email, testUser1.password);

    const inbox = await client.populateInbox(InboxType.Host);

    const {
      text,
      fromHost,
      conversationId: responseConversationId,
    } = inbox.data.populateInbox[0];

    expect(text).toEqual(message1);
    expect(fromHost).toEqual(false);
    expect(responseConversationId).toEqual(conversationId);
  });
});
