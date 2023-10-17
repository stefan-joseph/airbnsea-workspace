import Redis from "ioredis";
import { User } from "../../../entity/User";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { request } from "graphql-request";
import { TestClient } from "../../shared/test-utils/TestClient";
import { confirmEmailError } from "../login/errorMessages";

let userId = "";
const redis = new Redis();

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

describe("test createConfirmEmailLink", () => {
  const client = new TestClient("graphql");

  test("make sure user cannot sign in until email confirmed", async () => {
    const response = await client.login(email, password);
    expect(response.errors[0].message).toEqual(confirmEmailError);
    expect(response.data).toBeNull();
  });

  test("makes sure to confirm user and clears key in redis", async () => {
    const url = await createConfirmEmailLink(
      process.env.TEST_HOST as string,
      userId,
      redis
    );
    // extract id from url
    const urlChunks = url.split("/");
    const id = urlChunks[urlChunks.length - 1];

    const response = await request(
      (process.env.TEST_HOST as string) + "graphql",
      ` mutation {
              confirmEmail(id: "${id}")
          }`
    );
    expect(response.confirmEmail).toEqual(true);

    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();
    const value = await redis.get(id);
    expect(value).toBeNull();
  });

  test("sends invalid back if bad id sent", async () => {
    const response = await request(
      (process.env.TEST_HOST as string) + "graphql",
      ` mutation {
                confirmEmail(id: "${43543}")
            }`
    );
    expect(response.confirmEmail).toEqual(false);
  });
});
