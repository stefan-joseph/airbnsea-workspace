import { User } from "../entity/User";
import { createTypeormConnection } from "./createTypeormConnection";
import { redis } from "../redis";
import { createConfirmEmailLink } from "./createConfirmEmailLink";

let userId: string;
beforeAll(async () => {
  await createTypeormConnection();
  const user = await User.create({
    email: "bobbyboy@bob.com",
    password: "cjdkvbndsjvk",
  }).save();
  userId = user.id;
  console.log(userId);
});

test("makes sure to confirm user and clears key in redis", async () => {
  const url = await createConfirmEmailLink(
    process.env.TEST_HOST as string,
    userId,
    redis
  );
  const response = await fetch(url);
  const urlChunks1 = response.url.split("/");
  expect(urlChunks1[urlChunks1.length - 1]).toEqual("login");
  expect(await response.redirected).toEqual(true);

  const user = await User.findOne({ where: { id: userId } });
  expect((user as User).confirmed).toBeTruthy();
  const urlChunks2 = url.split("/");
  const id = urlChunks2[urlChunks2.length - 1];
  const redisIdValue = await redis.get(id);
  expect(redisIdValue).toBeNull();
});
