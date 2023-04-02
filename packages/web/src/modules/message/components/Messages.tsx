import { dateFormat } from "@airbnb-clone/common";
import {
  ConversationMessage,
  PopulateConversationQuery,
} from "@airbnb-clone/controller";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";

import { AppContext } from "../../../context/context";
import { SingleMessage } from "./SingleMessage";

export const Messages = ({
  messages,
  interlocutor,
  isHost,
}: {
  messages: ConversationMessage[];
  interlocutor: PopulateConversationQuery["populateConversation"]["interlocutor"];
  isHost?: boolean;
}) => {
  const {
    globalState: {
      user: { avatar, firstName },
    },
  } = useContext(AppContext);

  let lastMessageDate: string;
  return (
    <Stack
      padding={2}
      overflow="auto"
      flexDirection="column-reverse"
      sx={{ overflowAnchor: "none" }}
    >
      <Stack gap={2}>
        {messages.map(({ id, fromHost, text, createdDate }) => {
          let renderDateHeader = false;
          const messageDay = dayjs(createdDate).format(dateFormat);
          if (messageDay !== lastMessageDate) renderDateHeader = true;
          lastMessageDate = messageDay;
          return (
            <React.Fragment key={id}>
              {renderDateHeader && (
                <Typography
                  marginTop={1}
                  fontSize={12}
                  fontWeight={600}
                  color="grey.700"
                  textAlign="center"
                >
                  {dayjs(createdDate).format("MMM D, YYYY")}
                </Typography>
              )}
              {isHost ? (
                <SingleMessage
                  key={id}
                  image={fromHost ? avatar : (interlocutor?.avatar as string)}
                  name={fromHost ? firstName : interlocutor?.firstName}
                  text={text}
                  time={createdDate}
                />
              ) : (
                <SingleMessage
                  key={id}
                  image={fromHost ? (interlocutor?.avatar as string) : avatar}
                  name={fromHost ? interlocutor?.firstName : firstName}
                  text={text}
                  time={createdDate}
                />
              )}
            </React.Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
};
