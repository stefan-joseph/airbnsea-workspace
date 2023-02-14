import { Owner, ViewListingQuery } from "@airbnb-clone/controller";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { OutlinedButton } from "../../../components/OutlinedButton";

type Props = {
  data?: ViewListingQuery["viewListing"];
};

export const SubHeader = ({ data }: Props) => {
  const [messageOpen, setMessageOpen] = useState(false);

  const [yes, setYes] = useState(false);

  setTimeout(() => {
    setYes(true);
  }, 2000);

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} width="100%">
          <Stack spacing={0.4} flex={1}>
            <Typography
              variant="h2"
              fontSize={24}
              fontWeight={400}
              letterSpacing={0.2}
            >
              {data && yes ? (
                <>
                  <Box component="span" style={{ textTransform: "capitalize" }}>
                    {data.vesselType}{" "}
                  </Box>
                  hosted by {data?.owner?.firstName} {data?.owner?.lastName}
                </>
              ) : (
                <Skeleton width="100%" sx={{ maxWidth: 500 }} />
              )}
            </Typography>
            {data && yes ? (
              <Stack
                direction="row"
                spacing={1}
                divider={<Typography>·</Typography>}
                flexWrap="wrap"
              >
                <Typography fontSize={15} noWrap>
                  {data.guests} guests
                </Typography>
                <Typography fontSize={15} noWrap>
                  {data.beds} beds
                </Typography>
                <Typography fontSize={15} noWrap>
                  1 bedroom
                </Typography>
                <Typography fontSize={15} noWrap>
                  1 bath
                </Typography>
              </Stack>
            ) : (
              <Skeleton width="100%" height={24} sx={{ maxWidth: 300 }} />
            )}
          </Stack>

          {data && yes ? (
            <Avatar
              src={data.owner?.avatar}
              sx={{ width: 56, height: 56, ml: 2 }}
            />
          ) : (
            <Skeleton
              variant="circular"
              width={56}
              height={56}
              sx={{ ml: 5 }}
            />
          )}
        </Stack>
        {data && yes ? (
          <OutlinedButton
            text={"Contact host"}
            handleClick={() => setMessageOpen(true)}
            maxWidth={400}
          />
        ) : (
          <Skeleton
            variant="rounded"
            height={45}
            sx={{ maxWidth: 400, borderRadius: 3 }}
          />
        )}
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
