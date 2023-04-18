import { ConversationSuccess } from "@airbnb-clone/controller";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ConversationSuccessMessage = ({
  conversationId,
  recipient,
  handleClose,
}: {
  conversationId: string;
  recipient: ConversationSuccess["recipient"];
  handleClose: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Stack gap={6}>
      <Stack direction="row" justifyContent="space-between">
        <Stack gap={1}>
          <Typography fontSize={22} fontWeight={600}>
            Message sent!
          </Typography>
          <Typography color="grey.700">
            You should get a response from {recipient?.firstName || "the host"}{" "}
            within 24 hours.
          </Typography>
        </Stack>
        <Avatar
          src={recipient?.avatar || undefined}
          alt="host"
          sx={{ width: 56, height: 56 }}
        />
      </Stack>
      <Typography>
        Keep in mind your dates aren’t reserved until you’ve booked this vessel.
        You can continue to message {recipient?.firstName || "the host"} before
        or after booking your trip.
      </Typography>
      <Stack direction="row" ml="auto" gap={2}>
        <Button onClick={handleClose}>Close</Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/inbox/${conversationId}`)}
        >
          Go to messages
        </Button>
      </Stack>
    </Stack>
  );
};
