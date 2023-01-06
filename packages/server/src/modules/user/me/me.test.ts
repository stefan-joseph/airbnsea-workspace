import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import { testUser1 } from "../../shared/test-utils/testConstants";

beforeAll(async () => {
  await createTypeormConnection();
  await User.create({
    ...testUser1,
    confirmed: true,
  }).save();
});

describe("me", () => {
  const client = new TestClient("graphql");

  test("return null if no cookie", async () => {
    const response = await client.me();
    expect(response.data.me).toBeNull();
  });

  test("get current user", async () => {
    const { email, password, firstName, avatar } = testUser1;
    await client.login(email, password);
    const response = await client.me();
    expect(response.data).toEqual({
      me: {
        firstName,
        avatar,
      },
    });
  });
});
