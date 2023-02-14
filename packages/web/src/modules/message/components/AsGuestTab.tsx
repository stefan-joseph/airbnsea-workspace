import { Box, Divider } from "@mui/material";
import { usePopulateGuestInboxQuery } from "@airbnb-clone/controller";
import React from "react";

import { Interlocutor } from "./Interlocutor";
import { NavigateToFirstConversation } from "./NavigateToFirstConversation";

export const AsGuestTab = () => {
  const { data, loading, error } = usePopulateGuestInboxQuery();

  if (loading) return <Box>loading...</Box>;

  if (data) {
    return (
      <NavigateToFirstConversation
        conversationId={data?.populateGuestInbox[0].conversationId}
        isLoading={loading}
      >
        {data.populateGuestInbox.map((messageData, index, array) => (
          <React.Fragment key={messageData.id}>
            <Interlocutor data={messageData} />
            {array.length - 1 !== index && <Divider />}
          </React.Fragment>
        ))}
      </NavigateToFirstConversation>
    );
  }

  console.log("error", error);
  return <Box>There was an error</Box>;
};
