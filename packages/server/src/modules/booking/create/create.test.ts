import { invalidDate } from "@airbnb-clone/common";
import { Listing } from "../../../entity/Listing";
import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  testUser1,
  testUser2,
  testListing,
  testBooking,
  testBookingInPast,
  testBookingOverlap,
} from "../../shared/test-utils/testConstants";
import { cannotBookOwnListing, datesUnavailable } from "./utils/errorMessages";
import { v4 as uuidv4 } from "uuid";
import { formatNoListingErrorMessage } from "../../shared/utils/errorMessages";

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

describe("create booking", () => {
  const client = new TestClient("graphql");

  // can a custom error replace this to do the same as next test?
  test("user attempts to create booking with incorrect listing id format", async () => {
    await client.login(testUser1.email, testUser1.password);
    const testListingId = "badListingId";
    const { errors } = await client.createBooking(testListingId, testBooking);
    expect(errors[0].message).toEqual("No such listing exists");
  });

  test("user attempts to create booking with non-existent id", async () => {
    await client.login(testUser1.email, testUser1.password);
    const testListingId = uuidv4();
    const { errors } = await client.createBooking(testListingId, testBooking);
    console.log(errors);

    expect(errors[0].message).toEqual(
      formatNoListingErrorMessage(testListingId)
    );
  });

  test("user attempts to create booking on their own listing", async () => {
    const { errors } = await client.createBooking(listingId, testBooking);
    expect(errors[0].message).toEqual(cannotBookOwnListing);
  });

  test("user attempts to create booking in past", async () => {
    await client.login(testUser2.email, testUser2.password);
    const { errors } = await client.createBooking(listingId, testBookingInPast);
    expect(errors[0].message).toEqual(invalidDate);
  });

  test("user successfully creates booking", async () => {
    const { data } = await client.createBooking(listingId, testBooking);
    expect(typeof data.createBooking).toEqual("string");
  });

  test("user attempts to create booking overlapping another booking", async () => {
    const { errors } = await client.createBooking(
      listingId,
      testBookingOverlap
    );
    expect(errors[0].message).toEqual(datesUnavailable);
  });
});
