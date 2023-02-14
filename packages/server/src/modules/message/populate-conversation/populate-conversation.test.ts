import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  testUser1,
  testUser2,
  testListing,
} from "../../shared/test-utils/testConstants";
import { imageUrl } from "../../shared/utils/constants";

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

describe("populate conversation", () => {
  const client = new TestClient("graphql");

  const message1 = "initial message";

  test("guest sends message to host and populates conversation", async () => {
    await client.login(testUser2.email, testUser2.password);

    const {
      data: { createMessage },
    } = await client.createMessage(listingId, message1);

    const inbox = await client.populateConversationWithHost(createMessage);
    const {
      interlocutorId,
      interlocutor,
      listingId: responseListingId,
      listing,
      messages,
    } = inbox.data.populateConversationWithHost;

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

    const {
      data: { createMessage },
    } = await client.createMessage(listingId, message2);

    const inbox = await client.populateConversationWithGuest(createMessage);
    const {
      interlocutorId,
      interlocutor,
      listingId: responseListingId,
      listing,
      messages,
    } = inbox.data.populateConversationWithGuest;

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
});
