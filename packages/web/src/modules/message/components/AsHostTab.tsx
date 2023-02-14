import { Box, Divider } from "@mui/material";
import { usePopulateHostInboxQuery } from "@airbnb-clone/controller";
import React from "react";
import { Interlocutor } from "./Interlocutor";
import { NavigateToFirstConversation } from "./NavigateToFirstConversation";

export const AsHostTab = () => {
  const { data, loading, error } = usePopulateHostInboxQuery();

  if (loading) return <Box>loading...</Box>;
  console.log("data", data);

  if (data) {
    return (
      <NavigateToFirstConversation
        conversationId={data?.populateHostInbox[0].conversationId}
        isLoading={loading}
      >
        {data.populateHostInbox.map((messageData, index, array) => (
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
