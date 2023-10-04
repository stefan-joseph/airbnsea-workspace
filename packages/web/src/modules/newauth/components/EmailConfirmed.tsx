import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { AppContainer } from "../../../components/AppContainer";
import AuthFormContainer from "./AuthFormContainer";
import { theme } from "../../../MuiTheme";
import { IoAlertCircleOutline, IoCheckmarkCircle } from "react-icons/io5";

export default function EmailConfirmed() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
        <AuthFormContainer
          header={state?.header}
          title={state?.title}
          HeaderIcon={
            state?.status === "success" ? (
              <IoCheckmarkCircle size={26} color={theme.palette.success.main} />
            ) : (
              <IoAlertCircleOutline
                size={26}
                color={theme.palette.error.main}
              />
            )
          }
        >
          <Typography mb={4}>{state?.text}</Typography>
          <Box>
            <ButtonBase
              onClick={() => navigate("/login")}
              sx={{
                fontSize: 16,
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Return to login page
            </ButtonBase>
          </Box>
        </AuthFormContainer>
      </Stack>
    </AppContainer>
  );
}
