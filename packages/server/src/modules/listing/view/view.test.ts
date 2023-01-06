import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import { testUser1, testListing } from "../../shared/test-utils/testConstants";

import { v4 as uuidv4 } from "uuid";
import { formatNoListingErrorMessage } from "../../shared/utils/errorMessages";
import { imageUrl } from "./utils/constants";

let userId1: string;
let listingId: string;
let photos: string[];
beforeAll(async () => {
  await createTypeormConnection();

  const user1 = await User.create({
    ...testUser1,
    confirmed: true,
  }).save();
  userId1 = user1.id;

  const listing = await Listing.create({
    ...testListing,
    userId: userId1,
  }).save();

  listingId = listing.id;
  photos = listing.photos;
});

describe("view listing", () => {
  const client = new TestClient("graphql");

  test("user attempts to view listing with incorrect id", async () => {
    const incorrectListingId = uuidv4();
    const { errors } = await client.viewListing(incorrectListingId);

    expect(errors[0].message).toEqual(
      formatNoListingErrorMessage(incorrectListingId)
    );
  });

  test("user successfully views listing", async () => {
    const { data } = await client.viewListing(listingId);
    console.log("data", data);
    console.log("photos", photos);

    const photosWithFullUrl = photos.map((photo) => imageUrl + photo);

    expect(data.viewListing).toEqual({
      id: listingId,
      ...testListing,
      photos: photosWithFullUrl,
      userId: null,
      owner: {
        firstName: testUser1.firstName,
        lastName: testUser1.lastName,
        avatar: testUser1.avatar,
      },
    });
  });
});
