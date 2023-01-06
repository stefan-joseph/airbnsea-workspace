import Redis from "ioredis";

export const redis =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? new Redis()
    : new Redis(
        "redis://default:af5ac0df2e664a568c4052560f4f68e5@fly-airbnsea-redis.upstash.io",
        {
          family: 6,
        }
      );
