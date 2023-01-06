import { Owner } from "@airbnb-clone/controller";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { buttonBorderRadius } from "../../../constants/constants";

type Props = {
  data: {
    vesselType: string;
    guests: number;
    beds: number;
    owner: Owner | null | undefined;
  };
};

export const SubHeader = ({
  data: { vesselType, guests, beds, owner },
}: Props) => {
  const [messageOpen, setMessageOpen] = useState(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={0}>
        <Stack spacing={2}>
          <Stack spacing={0.4}>
            <Typography
              variant="h2"
              fontSize={24}
              fontWeight={400}
              letterSpacing={0.2}
            >
              <span style={{ textTransform: "capitalize" }}>{vesselType}</span>{" "}
              hosted by {owner?.firstName} {owner?.lastName}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              divider={<Typography>·</Typography>}
            >
              <Typography fontSize={15}>{guests} guests</Typography>
              <Typography fontSize={15}>{beds} beds</Typography>
              <Typography fontSize={15}>1 bedroom</Typography>
              <Typography fontSize={15}>1 bath</Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => setMessageOpen(true)}
            variant="outlined"
            sx={{
              // width: 100,
              textTransform: "unset",
              fontSize: 15,
              fontWeight: 700,
              whiteSpace: "nowrap",
              p: 1,
              borderRadius: buttonBorderRadius,
              color: "info.main",
              borderColor: "info.main",
              borderWidth: 1.5,
              "&:hover": {
                backgroundColor: "rgb(0, 0, 0, 0.03)",
                borderColor: "unset",
                borderWidth: 1.5,
              },
            }}
          >
            Contact host
          </Button>
        </Stack>
        <Avatar src={owner?.avatar} sx={{ width: 56, height: 56, ml: 2 }} />
      </Stack>
      <Dialog
        open={messageOpen}
        PaperProps={{ sx: { position: "relative", pl: 2 } }}
      >
        <DialogTitle>Message the host</DialogTitle>
        <DialogContent>
          <DialogContentText>Send a message to *host name*</DialogContentText>
          <TextField minRows={3} multiline sx={{ width: 500 }}></TextField>
        </DialogContent>
        <DialogActions>
          <IconButton
            onClick={() => setMessageOpen(false)}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 30,
              height: 30,
              m: 1,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
          <Button variant="contained">Send message</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
