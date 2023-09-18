import { Resolvers } from "../../types/types";

export const resolvers: Resolvers = {
  Mutation: {
    addFruit: async (_, { fruit }, { redis }) => {
      await redis.set("fruit", fruit + "!");
      return true;
    },
  },
  Query: {
    getFruit: async (_, __, { redis }) => {
      const fruit = await redis.get("fruit");
      if (fruit) return fruit;
      return "";
    },
  },
};
