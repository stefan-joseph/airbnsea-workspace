import { ButtonBase, Icon, Stack, Typography } from "@mui/material";
import { IoAlertCircleOutline, IoMailOutline } from "react-icons/io5";

import AuthFormContainer from "../components/AuthFormContainer";
import { Steps, User } from "../Auth";
import { theme } from "../../../MuiTheme";

export default function ConfirmEmailReminder({
  user,
  setAuthStep,
}: {
  user: User;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const { email } = user;
  return (
    <AuthFormContainer
      header="Confirm email"
      title="Please confirm your email"
      setAuthStep={setAuthStep}
      back
      HeaderIcon={
        <IoAlertCircleOutline size={26} color={theme.palette.error.main} />
      }
    >
      <Typography>You have not confirmed your email yet.</Typography>
      <Typography mt={2}>
        Another email has been sent to the provided email address:
      </Typography>
      <Stack flexDirection="row" mt={2} mb={4}>
        <Icon>
          <IoMailOutline size={16} />
        </Icon>
        <Typography fontWeight={100} ml={0.2}>
          {email}
        </Typography>
      </Stack>
      <Typography>
        Please follow the link in the email to confirm your Airbnsea account.
        You will need to do this before logging in.
      </Typography>
      <Stack alignSelf="flex-start" mt={6}>
        <ButtonBase
          onClick={() => setAuthStep(Steps.DEFAULT)}
          sx={{ fontSize: 16, textDecoration: "underline", fontWeight: 600 }}
        >
          Return to login
        </ButtonBase>
      </Stack>
    </AuthFormContainer>
  );
}
