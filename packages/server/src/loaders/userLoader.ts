import { User } from "../entity/User";
import DataLoader = require("dataloader");
import { In } from "typeorm";

type BatchUser = (ids: string[]) => Promise<User[]>;

const batchUsers: BatchUser = async (ids) => {
  // one sql call at the end to get all users
  const users = await User.findBy({ id: In(ids) });

  const userMap: { [key: string]: User } = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });
  // return same order they arrived
  return ids.map((id) => userMap[id]);
};

export const userLoader = () =>
  new DataLoader<string, User>((keys) => batchUsers(keys as string[]));
