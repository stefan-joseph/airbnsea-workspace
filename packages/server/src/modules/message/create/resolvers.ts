import { Message } from "../../../entity/Message";
import { Resolvers } from "../../../types/types";
// import { PUBSUB_NEW_MESSAGE } from "../shared/constants";

export const resolvers: Resolvers = {
  Mutation: {
    createMessage: async (_, { message }, { session, pubSub }) => {
      const dbMessage = await Message.create({
        ...message,
        userId: session.userId,
      }).save();

      console.log("dbMessage", dbMessage);

      pubSub.publish("newMessage", {
        newMessage: dbMessage,
      });

      return true;
    },
  },
};
