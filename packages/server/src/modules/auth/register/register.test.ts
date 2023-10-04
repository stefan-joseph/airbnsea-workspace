import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import {
  invalidEmail,
  nameNotLongEnough,
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
    const response = await client.register(email, password, firstName);
    expect(response.data.register.success).toEqual(true);
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  test("attempt to sign up with duplicate email", async () => {
    const response = await client.register(email, password, firstName);
    expect(response.data.register.success).toEqual(true);
  });

  test("checks for bad email", async () => {
    const response = await client.register("b", password, firstName);
    expect(response.data).toEqual({
      register: {
        message: invalidEmail,
        field: "email",
      },
    });
  });

  test("checks for bad password", async () => {
    const response = await client.register(email, "asdsd", firstName);
    expect(response.data).toEqual({
      register: {
        message: passwordNotLongEnough,
        field: "password",
      },
    });
  });

  test("checks for bad firstName", async () => {
    const response = await client.register(email, password, "q");

    expect(response.data).toEqual({
      register: {
        message: nameNotLongEnough,
        field: "firstName",
      },
    });
  });
});
