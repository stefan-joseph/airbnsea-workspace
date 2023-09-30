import { IconButton, Stack, Typography } from "@mui/material";
import { borderRadius, formBorderColor } from "../../../constants/constants";
import { IoChevronBack } from "react-icons/io5";

export default function AuthForm({
  children,
  title,
  welcome,
  back,
  setAuthStep,
}: {
  children: () => JSX.Element;
  title: string;
  welcome?: boolean;
  back?: string;
  setAuthStep: React.Dispatch<React.SetStateAction<string>>;
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
              onClick={() => setAuthStep(back)}
              sx={{ position: "absolute", left: 0 }}
            >
              <IoChevronBack />
            </IconButton>
          )}
          <Typography component="h2" fontWeight={600} m="auto">
            {title}
          </Typography>
        </Stack>
      </Stack>
      <Stack p={4}>
        {welcome && (
          <Stack pt={1} pb={2}>
            <Typography component="h3" variant="h5" gutterBottom>
              Welcome to Airbnsea
            </Typography>
          </Stack>
        )}
        {children()}
      </Stack>
    </Stack>
  );
}
