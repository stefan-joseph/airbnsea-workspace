import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { InboxType } from "../../../types/types";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  testUser1,
  testUser2,
  testUser3,
  testListing,
} from "../../shared/test-utils/testConstants";
import { unauthenticatedErrorMessage } from "../../shared/utils/errorMessages";

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

describe("populate inbox", () => {
  const client = new TestClient("graphql");

  const message1 = "first message";

  let conversationId: string;

  test("unauthenticated user attempts to populate conversation", async () => {
    const response = await client.populateInbox(InboxType.Guest);

    expect(response.errors[0].message).toEqual(unauthenticatedErrorMessage);
  });

  test("guest sends message to host and populates inbox", async () => {
    await client.login(testUser2.email, testUser2.password);

    const conversation = await client.createConversation(listingId, message1);

    conversationId = conversation.data.createConversation.conversationId;

    const inbox = await client.populateInbox(InboxType.Guest);

    expect(inbox.data.populateInbox.length).toEqual(1);

    const { text, interlocutorId } = inbox.data.populateInbox[0];

    expect(text).toEqual(message1);
    expect(interlocutorId).toBeNull();

    const { firstName, lastName, avatar } = testUser1;

    expect(inbox.data.populateInbox[0].interlocutor).toEqual({
      firstName,
      lastName,
      avatar,
    });
  });

  const message2 = "another message from different user";

  test("another guest sends message to same host, host receives all messages and populates inbox", async () => {
    await client.login(testUser3.email, testUser3.password);

    await client.createConversation(listingId, message2);

    await client.login(testUser1.email, testUser1.password);

    const inbox = await client.populateInbox(InboxType.Host);

    expect(inbox.data.populateInbox.length).toEqual(2);

    const { text, interlocutor, interlocutorId } = inbox.data.populateInbox[0];

    expect(text).toEqual(message2);
    expect(interlocutorId).toBeNull();

    const { firstName, lastName, avatar } = testUser3;

    expect(interlocutor).toEqual({
      firstName,
      lastName,
      avatar,
    });

    const { text: text2, interlocutor: interlocutor2 } =
      inbox.data.populateInbox[1];

    expect(text2).toEqual(message1);

    expect(interlocutor2).toEqual({
      firstName: testUser2.firstName,
      lastName: testUser2.lastName,
      avatar: testUser2.avatar,
    });
  });

  const message3 = "response message";
  test("host replies to first guest and populates inbox", async () => {
    await client.createMessage(conversationId, message3);

    const inbox = await client.populateInbox(InboxType.Host);

    expect(inbox.data.populateInbox.length).toEqual(2);

    expect(inbox.data.populateInbox[0].text).toEqual(message3);
    expect(inbox.data.populateInbox[1].text).toEqual(message2);
  });
});
