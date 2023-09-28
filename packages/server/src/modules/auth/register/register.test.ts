import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import { duplicateEmail } from "./utils/errorMessages";
import {
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
} from "@airbnb-clone/common";

beforeAll(async () => {
  await createTypeormConnection();
});

const email = "bob@bob.com";
const password = "dsjkvd";
const firstName = "Bob";

describe("Register user", () => {
  const client = new TestClient("graphql");
  test("registers a user", async () => {
    // registers a user
    const response = await client.register(email, password, firstName);
    expect(response.data).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  test("attempt to sign up with duplicate email", async () => {
    const response = await client.register(email, password, firstName);
    expect(response.data.register).toHaveLength(1);
    expect(response.data.register[0]).toEqual({
      path: "email",
      message: duplicateEmail,
    });
  });

  test("checks for bad email", async () => {
    const response = await client.register("b", password, firstName);

    expect(response.data).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough,
        },
        {
          path: "email",
          message: invalidEmail,
        },
      ],
    });
  });

  test("checks for bad password", async () => {
    const response = await client.register(email, "asdsd", firstName);

    expect(response.data).toEqual({
      register: [
        {
          path: "password",
          message: passwordNotLongEnough,
        },
      ],
    });
  });

  test("checks for bad email and password", async () => {
    const response = await client.register("bo", "asdsd", firstName);

    expect(response.data).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough,
        },
        {
          path: "email",
          message: invalidEmail,
        },
        {
          path: "password",
          message: passwordNotLongEnough,
        },
      ],
    });
  });

  //@TODO add test for firstName
});
