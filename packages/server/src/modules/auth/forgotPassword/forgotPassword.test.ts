import Redis from "ioredis";
import { User } from "../../../entity/User";
import { TestClient } from "../../shared/test-utils/TestClient";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { forgotPasswordLockedError } from "../login/errorMessages";
import { passwordNotLongEnough } from "@airbnb-clone/common";
import { expiredKeyError } from "./errorMessages";

let userId: string;
const redis = new Redis();
const email = "bob@bob.com";
const password = "forgottenPassword";
const newPassword = "newPassword";
const firstName = "Bob";

beforeAll(async () => {
  await createTypeormConnection();
  const user = await User.create({
    email,
    password,
    firstName,
    confirmed: true,
  }).save();
  userId = user.id;
});

describe("forgot password", () => {
  const client = new TestClient("graphql");
  let key: string;
  test("make sure user cannot log in after starting process", async () => {
    await forgotPasswordLockAccount(userId, redis);
    const url = await createForgotPasswordLink("", userId, redis);

    const urlChunks = url.split("/");
    key = urlChunks[urlChunks.length - 1];

    expect(await client.login(email, password)).toEqual({
      data: {
        login: {
          errors: [
            {
              path: "email",
              message: forgotPasswordLockedError,
            },
          ],
          sessionId: null,
        },
      },
    });
  });

  test("try changing password to something invalid", async () => {
    expect(await client.resetPassword("short", key)).toEqual({
      data: {
        resetPassword: [
          {
            path: "newPassword",
            message: passwordNotLongEnough,
          },
        ],
      },
    });
  });

  test("change password is successful", async () => {
    const response = await client.resetPassword(newPassword, key);
    expect(response.data).toEqual({
      resetPassword: null,
    });
  });

  test("make sure redis key expires after password has been changed", async () => {
    expect(await client.resetPassword("tryAgain", key)).toEqual({
      data: {
        resetPassword: [
          {
            path: "newPassword",
            message: expiredKeyError,
          },
        ],
      },
    });
  });

  test("user can log in with new password", async () => {
    const { data } = await client.login(email, newPassword);
    expect(data.login.errors).toBeNull();
    expect(data.login.sessionId).toBeTruthy();
  });
});
