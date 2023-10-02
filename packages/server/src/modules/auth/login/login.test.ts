import { User } from "../../../entity/User";
import { createTypeormConnection } from "../../../utils/createTypeormConnection";
import { TestClient } from "../../shared/test-utils/TestClient";
import { confirmEmailError, invalidCredentails } from "./errorMessages";

const email = "bob@bob.com";
const password = "dsjkvd";
const firstName = "Bob";

// const loginExpectError = async (
//   client: TestClient,
//   e: string,
//   p: string,
//   errMsg: string
// ) => {
//   console.log("errMsge", errMsg);
//   const response = await client.login(e, p);
//   console.log("response", response);
//   expect(response.data.login).toEqual({
//     message: invalidCredentails,
//     field: "",
//   });
// };

beforeAll(async () => {
  await createTypeormConnection();
});

describe("login", () => {
  const client = new TestClient("graphql");
  test("email not in use", async () => {
    const response = await client.login("john@john.com", password);
    expect(response.errors[0].message).toEqual(invalidCredentails);
    expect(response.data).toBeNull();
  });

  test("email not confirmed", async () => {
    await client.register(email, password, firstName);
    const response = await client.login(email, password);
    expect(response.errors[0].message).toEqual(confirmEmailError);
    expect(response.data).toBeNull();
  });

  test("incorrect password", async () => {
    await User.update({ email }, { confirmed: true });
    const response = await client.login(email, "fawdajnf");
    expect(response.errors[0].message).toEqual(invalidCredentails);
    expect(response.data).toBeNull();
  });

  test("login successful", async () => {
    const response = await client.login(email, password);
    expect(response.data.login.success).toEqual(true);
  });
});
