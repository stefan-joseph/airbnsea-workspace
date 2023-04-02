import { dateFormat } from "@airbnb-clone/common";
import dayjs = require("dayjs");
import { VesselType } from "../../../types/types";

// test constants

export const testUser1 = {
  email: "bob@bob.com",
  password: "cjdkvbndsjvk",
  firstName: "Bob",
  lastName: "Bobby",
  avatar: "http://testavatar.com",
};

export const testUser2 = {
  email: "sarah@sarah.com",
  password: "kdzjvndsjkvbj",
  firstName: "Sarah",
  lastName: "Smith",
  avatar: "http://testavatar.com",
};

export const testUser3 = {
  email: "carl@carl.com",
  password: "asfjhbvjvbkdj",
  firstName: "Carl",
  lastName: "Hodgepodge",
  avatar: "http://testavatar.com",
};

export const testListing = {
  vesselType: VesselType.Sailboat,
  street: "123 test street",
  apt: "123-b",
  city: "test city",
  state: "test state",
  country: "test country",
  zipcode: "12345",
  name: "Lovely boat",
  description: "really lovely boat",
  price: 100,
  rating: 4.89,
  beds: 2,
  guests: 2,
  latitude: 123.45,
  longitude: 123.45,
  amenities: ["wifi"],
  photos: ["photo.com", "photo.com", "photo.com", "photo.com", "photo.com"],
};

export const testBooking = {
  start: dayjs(new Date()).add(1, "day").format(dateFormat),
  end: dayjs(new Date()).add(2, "day").format(dateFormat),
  guests: 1,
};

export const testBookingInPast = {
  start: dayjs(new Date()).subtract(1, "day").format(dateFormat),
  end: dayjs(new Date()).add(1, "day").format(dateFormat),
  guests: 1,
};

export const testBookingOverlap = {
  start: dayjs(new Date()).add(1, "day").format(dateFormat),
  end: dayjs(new Date()).add(3, "day").format(dateFormat),
  guests: 1,
};
