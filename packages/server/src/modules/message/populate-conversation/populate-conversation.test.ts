import { v4 as uuidv4 } from "uuid";

import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  testUser1,
  testUser2,
  testListing,
  testUser3,
} from "../../shared/test-utils/testConstants";
import { imageUrl } from "../../shared/utils/constants";
import {
  formatBadUuidErrorMessage,
  formatNotFoundWithGivenIdErrorMessage,
  unauthenticatedErrorMessage,
} from "../../shared/utils/errorMessages";
import { noPermissionToViewConversationErrorMessage } from "./utils/errorMessages";

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

describe("populate conversation", () => {
  const client = new TestClient("graphql");

  const message1 = "initial message";

  let conversationId: string;

  test("unauthenticated user attempts to populate conversation", async () => {
    const populateGuest = await client.populateConversation(uuidv4());

    expect(populateGuest.errors[0].message).toEqual(
      unauthenticatedErrorMessage
    );
  });

  test("guest attempts to populate conversation with non-existent conversation id", async () => {
    await client.login(testUser2.email, testUser2.password);

    const nonExistentId = uuidv4();

    const populateGuest = await client.populateConversation(nonExistentId);

    expect(populateGuest.errors[0].message).toEqual(
      formatNotFoundWithGivenIdErrorMessage("conversation", nonExistentId)
    );
  });

  test("guest attempts to populate conversation with bad conversation id", async () => {
    await client.login(testUser2.email, testUser2.password);

    const populateGuest = await client.populateConversation(
      conversationId + "a"
    );

    expect(populateGuest.errors[0].message).toEqual(
      formatBadUuidErrorMessage("conversation")
    );
  });

  test("guest starts conversation with host and populates conversation", async () => {
    const { data } = await client.createConversation(listingId, message1);

    conversationId = data.createConversation.conversationId;

    const inbox = await client.populateConversation(conversationId);

    const {
      interlocutorId,
      interlocutor,
      listingId: responseListingId,
      listing,
      messages,
    } = inbox.data.populateConversation;

    expect(interlocutorId).toBeNull();
    expect(responseListingId).toEqual(listingId);
    expect(messages.length).toEqual(1);
    expect(messages[0].text).toEqual(message1);
    expect(messages[0].fromHost).toEqual(false);

    const { firstName, lastName, avatar } = testUser1;

    expect(interlocutor).toEqual({ firstName, lastName, avatar });

    const { name, photos } = testListing;

    expect(listing).toEqual({ name, img: imageUrl + photos[0] });
  });

  const message2 = "response message";

  test("host receives guest's message, responds and populates conversation", async () => {
    await client.login(testUser1.email, testUser1.password);

    await client.createMessage(conversationId, message2);

    const inbox = await client.populateConversation(conversationId);

    const {
      interlocutorId,
      interlocutor,
      listingId: responseListingId,
      listing,
      messages,
    } = inbox.data.populateConversation;

    expect(interlocutorId).toBeNull();
    expect(responseListingId).toEqual(listingId);

    expect(messages.length).toEqual(2);
    expect(messages[0].text).toEqual(message1);
    expect(messages[0].fromHost).toEqual(false);
    expect(messages[1].text).toEqual(message2);
    expect(messages[1].fromHost).toEqual(true);

    const { firstName, lastName, avatar } = testUser2;

    expect(interlocutor).toEqual({ firstName, lastName, avatar });

    const { name, photos } = testListing;

    expect(listing).toEqual({ name, img: imageUrl + photos[0] });
  });

  test("other user attempts to populate conversation that they are not part of", async () => {
    await client.login(testUser3.email, testUser3.password);

    const { errors } = await client.populateConversation(conversationId);

    expect(errors[0].message).toEqual(
      noPermissionToViewConversationErrorMessage
    );
  });
});
