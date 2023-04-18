import {
  calculateBookingCosts,
  getDayDifference,
  datesInPast,
  invalidDate,
} from "@airbnb-clone/common";
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
import { formatNotFoundWithGivenIdErrorMessage } from "../../shared/utils/errorMessages";
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

    expect(errors[0].message).toEqual(
      formatNotFoundWithGivenIdErrorMessage("listing", testListingId)
    );
  });

  test("user attempts to create booking on their own listing", async () => {
    const { errors } = await client.createBooking(listingId, testBooking);
    expect(errors[0].message).toEqual(cannotBookOwnListing);
  });

  test("user attempts to create booking in past", async () => {
    await client.login(testUser2.email, testUser2.password);
    const { errors } = await client.createBooking(listingId, testBookingInPast);
    expect(errors[0].message).toEqual(datesInPast);
  });

  test("user attempts to create booking with bad dates format", async () => {
    const { errors } = await client.createBooking(listingId, {
      start: "fdbdfb",
      end: "bfdbfd",
      guests: 1,
    });
    expect(errors[0].message).toEqual(invalidDate);
  });

  test("user successfully creates booking", async () => {
    const { data } = await client.createBooking(listingId, testBooking);
    const {
      start,
      end,
      guests,
      pricePerNight,
      serviceFee,
      taxes,
      total,
      listing,
    } = data.createBooking;
    expect(start).toEqual(testBooking.start);
    expect(end).toEqual(testBooking.end);
    expect(guests).toEqual(testBooking.guests);
    expect(pricePerNight).toEqual(testListing.price);

    const costs = calculateBookingCosts(
      testListing.price,
      getDayDifference(start, end)
    );

    expect(serviceFee).toEqual(costs.serviceFee);
    expect(taxes).toEqual(costs.taxes);
    expect(total).toEqual(costs.total);

    const { vesselType, name, photos, rating } = testListing;

    expect(listing).toEqual({
      vesselType,
      name,
      img: imageUrl + photos[0],
      rating,
    });
  });

  test("user attempts to create booking overlapping another booking", async () => {
    const { errors } = await client.createBooking(
      listingId,
      testBookingOverlap
    );
    expect(errors[0].message).toEqual(datesUnavailable);
  });
});
