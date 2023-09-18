import { useParams } from "react-router-dom";
import { usePopulateConversationQuery } from "@airbnb-clone/controller";
import { gql } from "@apollo/client";

import { ConversationContainer } from "./ConversationContainer";
import { Messages } from "./Messages";
import { useEffect } from "react";
import { ErrorMessage } from "./ErrorMessage";

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

export const PopulateConversation = () => {
  const { conversationId } = useParams();

  const { data, loading, error, subscribeToMore } =
    usePopulateConversationQuery({
      variables: { conversationId: conversationId as string },
      skip: !conversationId,
    });

  useEffect(() => {
    if (loading || !conversationId) return;
    const unsubscribe = subscribeToMore({
      document: NewMessageSubscriptionDocument,
      variables: { conversationId: conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } = subscriptionData.data as any;
        return {
          ...prev,
          populateConversation: {
            ...prev.populateConversation,
            messages: [...prev.populateConversation.messages, newMessage],
          },
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore, loading, conversationId]);

  if (!conversationId || loading) {
    return <ConversationContainer />;
  }

  if (data?.populateConversation) {
    const { interlocutor, messages } = data?.populateConversation;
    return (
      <ConversationContainer loading={loading} data={data.populateConversation}>
        <Messages messages={messages} interlocutor={interlocutor} />
      </ConversationContainer>
    );
  }

  return (
    <ConversationContainer>
      {error && <ErrorMessage error={error} />}
    </ConversationContainer>
  );
};
