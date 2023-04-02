import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { AppContainer } from "../../components/AppContainer";
import {
  appSidePaddingAlt,
  bottomNavbarHeight,
  desktopMinWidth,
  searchBarHeight,
} from "../../constants/constants";
import { TabButton } from "./components/TabButton";
import { PopulateConversation } from "./components/PopulateConversation";
import { PopulateInbox } from "./components/PopulateInbox";

export const Message = () => {
  const { conversationId } = useParams();

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const matches = useMediaQuery(desktopMinWidth);

  const [tabOpen, setTabOpen] = useState<string>(tab || "guest");

  useEffect(() => setTabOpen(tab || "guest"), [tab]);

  const tabs = [
    { tab: "guest", text: "As guest" },
    { tab: "host", text: "As host" },
  ];

  return (
    <AppContainer withoutSearch>
      <Stack direction="row">
        <Stack flex={1} maxWidth={matches ? 350 : undefined}>
          <Stack
            height={`calc(100vh - ${
              matches ? searchBarHeight : bottomNavbarHeight
            }px)`}
          >
            <Stack
              justifyContent="center"
              paddingLeft={3}
              paddingRight={3}
              paddingTop={!matches ? 4 : undefined}
              height={matches ? 72 : undefined}
            >
              <Typography fontSize={matches ? 18 : 30} fontWeight={600}>
                Messages
              </Typography>
            </Stack>
            {matches && <Divider />}
            <Stack paddingLeft={3} paddingRight={3} paddingTop={2}>
              <Stack direction="row" marginLeft={-1}>
                {tabs.map(({ tab, text }) => (
                  <TabButton
                    key={tab}
                    tab={tab}
                    text={text}
                    tabOpen={tabOpen}
                    setTabOpen={setTabOpen}
                  />
                ))}
              </Stack>
              <Divider />
            </Stack>
            <Box
              overflow="auto"
              flex="1"
              minHeight={0}
              paddingLeft={appSidePaddingAlt}
              paddingRight={appSidePaddingAlt}
            >
              <PopulateInbox />
            </Box>
          </Stack>
        </Stack>
        {matches && (
          <>
            <Divider orientation="vertical" flexItem />
            <Stack flex={1}>
              <PopulateConversation />
            </Stack>
          </>
        )}
      </Stack>
      {!matches && (
        <Drawer
          open={!!conversationId}
          anchor="right"
          PaperProps={{ sx: { width: "100vw" } }}
        >
          <PopulateConversation />
        </Drawer>
      )}
    </AppContainer>
  );
};
