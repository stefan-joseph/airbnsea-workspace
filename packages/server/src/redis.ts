import Redis from "ioredis";

export const redis =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? new Redis()
    : new Redis(process.env.REDIS_URL as string, {
        family: 6,
      });
