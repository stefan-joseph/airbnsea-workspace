import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePopulateConversationWithGuestQuery } from "@airbnb-clone/controller";
import { gql } from "@apollo/client";

import { ConversationContainer } from "./ConversationContainer";
import { Messages } from "./Messages";
import { useEffect } from "react";

const NewMessageSubscriptionDocument = gql`
  subscription ($conversationId: String!) {
    newMessage(conversationId: $conversationId) {
      id
      text
      fromHost
      createdDate
    }
  }
`;

export const ConversationWithGuest = () => {
  const { conversationId } = useParams();

  const { data, loading, error, subscribeToMore } =
    usePopulateConversationWithGuestQuery({
      variables: { conversationId: conversationId as string },
      skip: !conversationId,
    });

  useEffect(() => {
    if (loading) return;
    const unsubscribe = subscribeToMore({
      document: NewMessageSubscriptionDocument,
      variables: { conversationId: conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } = subscriptionData.data as any;
        const newData = {
          ...prev,
          populateConversationWithGuest: {
            ...prev.populateConversationWithGuest,
            messages: [
              ...prev.populateConversationWithGuest.messages,
              newMessage,
            ],
          },
        };
        console.log("newData", newData);

        return newData;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, loading]);

  if (!conversationId || loading) {
    return <ConversationContainer />;
  }

  if (data?.populateConversationWithGuest) {
    const { interlocutor, messages } = data?.populateConversationWithGuest;
    return (
      <ConversationContainer
        loading={loading}
        data={data.populateConversationWithGuest}
      >
        <Messages isHost messages={messages} interlocutor={interlocutor} />
      </ConversationContainer>
    );
  }

  console.log("error", error);
  return <Box>There was an error...</Box>;
};
