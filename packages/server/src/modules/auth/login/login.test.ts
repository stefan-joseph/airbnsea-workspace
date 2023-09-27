import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import { confirmEmailError, invalidLogin } from "./errorMessages";

const email = "bob@bob.com";
const password = "dsjkvd";

const loginExpectError = async (
  client: TestClient,
  e: string,
  p: string,
  errMsg: string
) => {
  const response = await client.login(e, p);

  expect(response.data.login).toEqual({
    errors: [
      {
        path: "email",
        message: errMsg,
      },
    ],
    sessionId: null,
  });
};

beforeAll(async () => {
  await createTypeormConnection();
});

describe("login", () => {
  const client = new TestClient("graphql");
  test("email not in use", async () => {
    await loginExpectError(client, "john@john.com", password, invalidLogin);
  });

  test("email not confirmed", async () => {
    await client.register(email, password);
    await loginExpectError(client, email, password, confirmEmailError);
  });

  test("incorrect password", async () => {
    await User.update({ email }, { confirmed: true });
    await loginExpectError(client, email, "fawdajnf", invalidLogin);
  });

  test("login successful", async () => {
    const response = await client.login(email, password);

    expect(response.data.login.errors).toBeNull();
    expect(response.data.login.sessionId).toBeTruthy();
  });
});
