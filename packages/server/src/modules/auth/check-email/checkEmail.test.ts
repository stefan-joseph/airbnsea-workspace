import { User } from "../../../entity/User";
import { AuthorizationServer } from "../../../types/types";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import { invalidEmail } from "@airbnb-clone/common";

let userId = "";

const email = "bob@bob.com";
const password = "dsjkvd";
const firstName = "Bob";

beforeAll(async () => {
  await createTypeormConnection();
  const user = await User.create({
    email,
    password,
    firstName,
  }).save();
  userId = user.id;
});

describe("check email", () => {
  const client = new TestClient("graphql");

  test("bad email", async () => {
    const { data } = await client.checkEmail("asd@");
    expect(data.checkEmail).toEqual({
      field: "email",
      message: invalidEmail,
    });
  });

  test("user does not exist", async () => {
    const nonExistententUser = "nonexistent@user.com";
    const { data } = await client.checkEmail(nonExistententUser);
    expect(data.checkEmail).toEqual({
      email: nonExistententUser,
      userExists: false,
    });
  });

  test("user not confirmed", async () => {
    const { data } = await client.checkEmail(email);
    expect(data.checkEmail).toEqual({
      email,
      userExists: true,
    });
  });

  test("user should sign in with password", async () => {
    await User.update({ id: userId }, { confirmed: true });
    const { data } = await client.checkEmail(email);
    expect(data.checkEmail).toEqual({
      email,
      userExists: true,
    });
  });

  test("user exists with oauth", async () => {
    const oauthEmail = "oauth@email.com";
    const authorizationServer = AuthorizationServer["Github"];
    await User.create({
      email: oauthEmail,
      firstName,
      authorizationServer,
      confirmed: true,
    }).save();
    const { data } = await client.checkEmail(oauthEmail);
    expect(data.checkEmail).toEqual({
      email: oauthEmail,
      authorizationServer,
      firstName,
      avatar: null,
    });
  });
});
