import { Message } from "../../../entity/Message";
import { InboxType, Resolvers } from "../../../types/types";
import { getTypeormConnection } from "../../../utils/getTypeormConnection";

export const resolvers: Resolvers = {
  InboxMessage: {
    interlocutor: ({ interlocutorId }, _, { userLoader }) =>
      userLoader.load(interlocutorId),
    interlocutorId: () => null, // don't return any userId's to client
  },
  Query: {
    populateInbox: async (
      _,
      { inboxType },
      {
        req: {
          session: { userId },
        },
      }
    ) => {
      let query = getTypeormConnection()
        .getRepository(Message)
        .createQueryBuilder("m")
        .distinctOn(["m.conversationId"])
        .orderBy("m.conversationId")
        .addOrderBy("m.createdDate", "DESC");

      if (inboxType === InboxType.Guest) {
        query.where("m.userIdOfGuest = :userId", { userId });
      } else {
        query.where("m.userIdOfHost = :userId", { userId });
      }

      const results = await query.getMany();

      const modifiedResults = results
        .sort((a, b) => Number(b.createdDate) - Number(a.createdDate))
        .map((message) => ({
          ...message,
          interlocutorId:
            inboxType === InboxType.Guest
              ? message.userIdOfHost
              : message.userIdOfGuest,
        }));
      // @TODO add pagination
      // const splitResults = results.slice(0, 11);

      return modifiedResults;
    },
  },
};
