import { IconButton, Stack, Typography } from "@mui/material";
import { IoChevronBack } from "react-icons/io5";

import { borderRadius } from "../../../constants/constants";
import { Steps } from "../Auth";
import TransitionAlerts from "./TransitionAlerts";

export default function AuthFormContainer({
  children,
  header,
  HeaderIcon,
  title,
  subtitle,
  back,
  error,
  setAuthStep,
}: {
  children: JSX.Element | JSX.Element[];
  header: string;
  HeaderIcon?: JSX.Element;
  title?: string;
  subtitle?: JSX.Element;
  back?: boolean;
  error?: string;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  return (
    <Stack
      maxWidth={568}
      width="100%"
      border="1px solid #B0B0B0"
      borderRadius={borderRadius}
    >
      <Stack pl={3} pr={3} minHeight={64} borderBottom="1px solid #EBEBEB">
        <Stack position="relative" mt="auto" mb="auto" justifyContent="center">
          {back && (
            <IconButton
              aria-label="back"
              onClick={() => setAuthStep(Steps.DEFAULT)}
              sx={{ position: "absolute", left: 0 }}
            >
              <IoChevronBack />
            </IconButton>
          )}
          <Stack flexDirection="row" alignItems="center" m="auto" gap={1}>
            {HeaderIcon}
            <Typography component="h2" fontWeight={600}>
              {header}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack p={4}>
        {title && (
          <Stack pt={1} pb={2}>
            <Typography component="h3" variant="h5" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Stack pt={1} pb={2}>
                {subtitle}
              </Stack>
            )}
          </Stack>
        )}
        {error && (
          <Stack mb={3}>
            <TransitionAlerts severity="error" text={error} />
          </Stack>
        )}
        {children}
      </Stack>
    </Stack>
  );
}
