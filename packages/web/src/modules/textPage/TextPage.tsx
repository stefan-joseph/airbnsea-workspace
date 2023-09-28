import { useLocation, useNavigate } from "react-router-dom";
import { AuthPageContainer } from "../auth/components/AuthPageContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import { appSidePadding } from "../../constants/constants";

export const TextPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <AuthPageContainer>
      <Stack m={appSidePadding} alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          {state?.message && state.message}
        </Typography>
        <Box>
          <Button
            onClick={() => navigate("/login")}
            sx={{ padding: 2, paddingLeft: 4, paddingRight: 4 }}
          >
            Return to login page
          </Button>
        </Box>
      </Stack>
    </AuthPageContainer>
  );
};
