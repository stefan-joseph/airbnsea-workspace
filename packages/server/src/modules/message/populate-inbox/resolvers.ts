import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
import { getTypeormConnection } from "../../../utils/getTypeormConnection";

const populateInboxQueryBuilder = async () =>
  getTypeormConnection()
    .getRepository(Message)
    .createQueryBuilder("m")
    .distinctOn(["m.conversationId"])
    .orderBy("m.conversationId")
    .addOrderBy("m.createdDate", "DESC");

export const resolvers: Resolvers = {
  MessageWithHost: {
    interlocutor: ({ userIdOfHost }, _, { userLoader }) =>
      userLoader.load(userIdOfHost),
    userIdOfHost: () => null, // don't return any userId's to client
  },
  MessageWithGuest: {
    interlocutor: ({ userIdOfGuest }, _, { userLoader }) =>
      userLoader.load(userIdOfGuest),
    userIdOfGuest: () => null, // don't return any userId's to client
  },

  Query: {
    populateGuestInbox: async (
      _,
      __,
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      const results = await (await populateInboxQueryBuilder())
        .where("m.userIdOfGuest = :userId", { userId })
        .getMany();

      results.sort((a, b) => Number(b.createdDate) - Number(a.createdDate));
      // @TODO add pagination
      // const splitResults = results.slice(0, 11);
      return results;
    },

    populateHostInbox: async (
      _,
      __,
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      const results = await (await populateInboxQueryBuilder())
        .where("m.userIdOfHost = :userId", { userId })
        .getMany();
      results.sort((a, b) => Number(b.createdDate) - Number(a.createdDate));
      // @TODO add pagination
      return results;
    },
  },
};
