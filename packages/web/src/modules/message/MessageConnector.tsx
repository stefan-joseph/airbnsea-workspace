import { useViewMessagesQuery } from "@airbnb-clone/controller";
import { Link, useParams } from "react-router-dom";
import { CreateMessage } from "./CreateMessage";
import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";

const NewMessageSubscriptionDocument = gql`
  subscription ($listingId: String!) {
    newMessage(listingId: $listingId) {
      text
      listingId
      user {
        email
        name
      }
    }
  }
`;

export const MessageConnector = () => {
  const { listingId } = useParams();
  const { data, error, loading, subscribeToMore } = useViewMessagesQuery({
    variables: { listingId: listingId as string },
  });

  useEffect(() => {
    if (loading) return;
    const unsubscribe = subscribeToMore({
      document: NewMessageSubscriptionDocument,
      variables: { listingId: listingId as string },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } = subscriptionData.data as any;
        return {
          ...prev,
          messages: [...(prev.messages as []), newMessage],
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, loading]);

  if (loading) return <div>Loading...</div>;

  if (data?.messages) {
    const { messages } = data;
    console.log(messages);

    return (
      <div>
        <Link to={`/listing/${listingId}`}>Listing</Link>
        {messages.map(({ text }, i) => (
          <div key={`${i}-message`}>
            <p>{text}</p>
          </div>
        ))}
        <CreateMessage listingId={listingId as string} />
      </div>
    );
  }

  console.log(error);
  return <div>There was an error</div>;
};
