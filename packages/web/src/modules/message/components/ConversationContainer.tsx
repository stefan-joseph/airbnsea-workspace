import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Conversation } from "@airbnb-clone/controller";

import { Loader } from "../../../components/Loader";
import { CreateMessage } from "./CreateMessage";
import { desktopMinWidth, searchBarHeight } from "../../../constants/constants";

export const ConversationContainer = ({
  children,
  loading,
  data,
}: {
  children?: JSX.Element;
  loading?: boolean;
  data?: Conversation | undefined;
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const matches = useMediaQuery(desktopMinWidth);
  return (
    <Stack
      width="100%"
      height={!matches ? "100vh" : `calc(100vh - ${searchBarHeight}px)`}
    >
      <Stack
        direction="row"
        padding={2}
        alignItems="center"
        gap={2}
        height={matches ? 72 : undefined}
      >
        {!matches && (
          <IconButton
            type="button"
            onClick={() => navigate(`/inbox${tab ? `?tab=${tab}` : ""}`)}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        )}
        <Typography fontWeight={600} fontSize={18}>
          {data?.interlocutor?.firstName} {data?.interlocutor?.lastName}
        </Typography>
        {matches && (
          <Button
            variant="outlined"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              console.log("!", location.pathname + location.search);

              navigate(`/listing/${data?.listingId}/view`, {
                state: { from: `${location.pathname + location.search}` },
              });
            }}
          >
            Details
          </Button>
        )}
      </Stack>
      <Divider />
      {loading ? (
        <Loader />
      ) : (
        <>
          {!matches && data?.listing && (
            <>
              <Link
                to={`/listing/${data?.listingId}/view`}
                state={{ from: `${location.pathname + location.search}` }}
              >
                <Stack direction="row" alignItems="center" padding={2}>
                  <Avatar
                    alt={data?.listing?.name || "listing"}
                    src={data?.listing?.img || ""}
                    variant="rounded"
                    sx={{ marginRight: 2, height: 46, width: 46 }}
                  />
                  <Stack>
                    <Typography fontWeight={600}>
                      {data?.listing?.name}
                    </Typography>
                    <Typography fontSize={14}>Unavailable</Typography>
                  </Stack>
                  <Button variant="outlined" sx={{ marginLeft: "auto" }}>
                    Details
                  </Button>
                </Stack>
              </Link>
              <Divider />
            </>
          )}
          {children}
          <Box marginTop="auto" padding={3} paddingBottom={2} paddingTop={2}>
            <CreateMessage conversationId={data?.conversationId} />
          </Box>
        </>
      )}
    </Stack>
  );
};
