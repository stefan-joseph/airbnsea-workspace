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
  testUser3,
  testListing,
} from "../../shared/test-utils/testConstants";
import {
  formatBadUuidErrorMessage,
  formatNotFoundWithGivenIdErrorMessage,
  unauthenticatedErrorMessage,
} from "../../shared/utils/errorMessages";
import { noPermissionToParticipateInConversationErrorMessage } from "./utils/errorMessages";
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

  await User.create({
    ...testUser3,
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

  let conversationId: string;

  test("unauthenticated user attempts to send message", async () => {
    const { errors } = await client.createMessage(listingId, "message");

    expect(errors[0].message).toEqual(unauthenticatedErrorMessage);
  });

  test("user attempts to send message with bad conversation id", async () => {
    await client.login(testUser2.email, testUser2.password);

    const {
      data: {
        createConversation: { conversationId: responseConversationId },
      },
    } = await client.createConversation(listingId, "initial message");

    conversationId = responseConversationId;

    const { errors } = await client.createMessage(
      conversationId + "a",
      "message"
    );

    expect(errors[0].message).toEqual(
      formatBadUuidErrorMessage("conversationId")
    );
  });

  test("user attempts to send message to non-existent listing", async () => {
    const nonExistentConversationId = uuidv4();
    const { errors } = await client.createMessage(
      nonExistentConversationId,
      "message"
    );
    expect(errors[0].message).toEqual(
      formatNotFoundWithGivenIdErrorMessage(
        "conversation",
        nonExistentConversationId
      )
    );
  });

  test("guest attempts to send empty message to host", async () => {
    const { errors } = await client.createMessage(conversationId, "");
    expect(errors[0].message).toEqual(messageRequired);
  });

  test("guest successfully sends message to host", async () => {
    const message = "second message";

    const { data } = await client.createMessage(conversationId, message);

    expect(validate(data.createMessage)).toEqual(true);

    const inbox = await client.populateInbox(InboxType.Guest);

    const {
      text,
      fromHost,
      conversationId: responseConversationId,
    } = inbox.data.populateInbox[0];

    expect(text).toEqual(message);
    expect(fromHost).toEqual(false);
    expect(responseConversationId).toEqual(conversationId);
  });

  test("other user attempts to send message to conversation they are not part of", async () => {
    await client.login(testUser3.email, testUser3.password);

    const { errors } = await client.createMessage(conversationId, "message");

    expect(errors[0].message).toEqual(
      noPermissionToParticipateInConversationErrorMessage
    );
  });

  test("host succesfully responds to guest", async () => {
    await client.login(testUser1.email, testUser1.password);

    const responseMessage = "response message";

    const { data } = await client.createMessage(
      conversationId,
      responseMessage
    );

    expect(validate(data.createMessage)).toEqual(true);

    const inbox = await client.populateInbox(InboxType.Host);

    const {
      text,
      fromHost,
      conversationId: responseConversationId,
    } = inbox.data.populateInbox[0];

    expect(text).toEqual(responseMessage);
    expect(fromHost).toEqual(true);
    expect(responseConversationId).toEqual(conversationId);
  });
});
