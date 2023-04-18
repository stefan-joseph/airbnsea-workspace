import { ViewListingQuery } from "@airbnb-clone/controller";
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { OutlinedButton } from "../../../components/OutlinedButton";
import { CreateConversation } from "../../message/components/CreateConversation";
import { useParams } from "react-router-dom";

type Props = {
  data?: ViewListingQuery["viewListing"];
};

export const SubHeader = ({ data }: Props) => {
  const { listingId } = useParams();
  const [messageOpen, setMessageOpen] = useState(false);

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
              {data ? (
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
            {data ? (
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

          {data ? (
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
        {data ? (
          <OutlinedButton
            text={"Contact host"}
            handleClick={() => setMessageOpen(true)}
            maxWidth={400}
          />
        ) : (
          <Skeleton
            variant="rounded"
            height={45}
            sx={{
              maxWidth: 400,
              borderRadius: 3,
              borderColor: "palette.primary.main",
            }}
          />
        )}
      </Stack>
      {listingId && data?.owner && (
        <CreateConversation
          messageOpen={messageOpen}
          setMessageOpen={setMessageOpen}
          listingId={listingId}
          recipientName={data.owner.firstName}
          handleClose={() => setMessageOpen(false)}
        />
      )}
    </>
  );
};
