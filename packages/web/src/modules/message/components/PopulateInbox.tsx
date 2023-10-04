import { Divider, Stack, Typography } from "@mui/material";
import { InboxType, usePopulateInboxQuery } from "@airbnb-clone/controller";
import React, { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import dayjs from "dayjs";

import { Interlocutor } from "./Interlocutor";
import { NavigateToFirstConversation } from "./NavigateToFirstConversation";
import Loader from "../../../components/Loader";
import { ErrorMessage } from "./ErrorMessage";

const UpdateInboxSubscriptionDocument = gql`
  subscription {
    updateInbox {
      id
      text
      fromHost
      createdDate
      conversationId
    }
  }
`;

export const PopulateInbox = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  console.log("tab", tab);
  const { conversationId } = useParams();

  const { data, loading, error, subscribeToMore } = usePopulateInboxQuery({
    variables: {
      inboxType: tab === "host" ? InboxType["Host"] : InboxType["Guest"],
    },
    // messages are acutely time sensitive and should remian up to date all the time
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (loading) return;
    const unsubscribe = subscribeToMore({
      document: UpdateInboxSubscriptionDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { updateInbox } = subscriptionData.data as any;

        // replace appropriate inbox message
        const newInboxMessages = prev.populateInbox.map((message) =>
          message.conversationId === updateInbox.conversationId
            ? {
                ...message,
                id: updateInbox.id,
                text: updateInbox.text,
                createdDate: updateInbox.createdDate,
                fromHost: updateInbox.fromHost,
              }
            : message
        );

        // move replaced inbox message to most recent in inbox
        newInboxMessages.sort(
          (a, b) => Number(dayjs(b.createdDate)) - Number(dayjs(a.createdDate))
        );

        return {
          ...prev,
          populateInbox: [...newInboxMessages],
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore, loading]);

  let previousConversationId: string;

  if (loading) return <Loader />;

  console.log("data", data);

  if (!data?.populateInbox || data.populateInbox.length < 1) {
    return (
      <Stack justifyContent="center" height="100%">
        <Typography variant="h6" component="p" style={{ alignSelf: "center" }}>
          You do not have any conversation history as a{" "}
          {tab === "host" ? tab : "guest"}.
        </Typography>
      </Stack>
    );
  }

  if (data) {
    return (
      <NavigateToFirstConversation
        conversationId={data?.populateInbox[0].conversationId}
        isLoading={loading}
      >
        {data.populateInbox.map((messageData, index) => {
          const dividerIsVisible =
            messageData.conversationId !== conversationId &&
            previousConversationId !== conversationId;
          previousConversationId = messageData.conversationId;

          return (
            <React.Fragment key={messageData.id}>
              {index !== 0 && (
                <Divider sx={{ opacity: dividerIsVisible ? 1 : 0 }} />
              )}
              <Interlocutor data={messageData} />
            </React.Fragment>
          );
        })}
      </NavigateToFirstConversation>
    );
  }

  return <>{error && <ErrorMessage error={error} />}</>;
};
