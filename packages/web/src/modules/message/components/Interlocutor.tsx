import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { MessageWithGuest, MessageWithHost } from "@airbnb-clone/controller";

import { Link, useSearchParams, useParams } from "react-router-dom";

export const Interlocutor = ({
  data: { id, interlocutor, text, conversationId },
}: {
  data: MessageWithGuest | MessageWithHost;
}) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const { conversationId: ConversationIdParam } = useParams();

  return (
    <Link to={`/inbox/${conversationId}${tab ? `?tab=${tab}` : ""}`}>
      <Box
        width="106%"
        borderRadius={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor:
            ConversationIdParam === conversationId ? "grey.100" : undefined,
          transform: "translateX(-3%)",
        }}
      >
        <Stack
          key={id}
          direction="row"
          paddingTop={2}
          paddingBottom={2}
          width="94%"
        >
          <Avatar
            alt={interlocutor?.firstName || "user"}
            src={interlocutor?.avatar || ""}
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />

          <Box>
            <Typography fontSize={14} color="grey.700" fontWeight={300}>
              {interlocutor?.firstName} {interlocutor?.lastName}
            </Typography>
            <Typography fontSize={14}>{text}</Typography>
            <Typography fontSize={12} color="grey.700" fontWeight={300}>
              Unavailable
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
};
