import { redis } from "../../redis";
import { Resolvers } from "../../types/types";

export const resolvers: Resolvers = {
  Mutation: {
    addFruit: async (_, { fruit }, { redis }) => {
      console.log(fruit);
      await redis.set("fruit", fruit);
      return true;
    },
  },
  Query: {
    getFruit: async () => {
      const fruit = await redis.get("fruit");
      if (fruit) return fruit;
      return "";
    },
  },
};
