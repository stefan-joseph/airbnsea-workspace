import Redis from "ioredis";
import { redisSessionPrefix, userSessionIdPrefix } from "./constants";

export const removeAllOfUsersSessions = async (
  userId: string,
  redis: Redis
) => {
  const sessionIds = await redis.lrange(
    `${userSessionIdPrefix}${userId}`,
    0,
    -1
  );

  const promises = [];
  for (let i = 0; i < sessionIds.length; i++) {
    promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
