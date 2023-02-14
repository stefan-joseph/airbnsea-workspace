import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePopulateConversationWithHostQuery } from "@airbnb-clone/controller";
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

export const ConversationWithHost = () => {
  const { conversationId } = useParams();

  const { data, loading, error, subscribeToMore } =
    usePopulateConversationWithHostQuery({
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
        return {
          ...prev,
          populateConversationWithHost: {
            ...prev.populateConversationWithHost,
            messages: [
              ...prev.populateConversationWithHost.messages,
              newMessage,
            ],
          },
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, loading]);

  if (!conversationId || loading) {
    return <ConversationContainer />;
  }

  if (data?.populateConversationWithHost) {
    const { interlocutor, messages } = data?.populateConversationWithHost;
    return (
      <ConversationContainer
        loading={loading}
        data={data.populateConversationWithHost}
      >
        <Messages messages={messages} interlocutor={interlocutor} />
      </ConversationContainer>
    );
  }

  console.log("error", error);
  return <Box>There was an error...</Box>;
};
