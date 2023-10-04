import { Stack, Typography } from "@mui/material";
import Loader from "../../../components/Loader";
import { Navigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "@airbnb-clone/controller";
import { useEffect } from "react";
import { AppContainer } from "../../../components/AppContainer";

export default function ConfirmEmailPath() {
  const { key } = useParams();

  const [confirmEmailMutation, { data, loading }] = useConfirmEmailMutation({
    variables: { id: key as string },
  });

  useEffect(() => {
    confirmEmailMutation();
  }, []);

  if (data?.confirmEmail) {
    return (
      <Navigate
        to="/email-confirmed"
        state={{
          header: "Email confirmed",
          title: "Email confirmed",
          text: "Your email has been confirmed. You can now log in to your account.",
          status: "success",
        }}
      />
    );
  }

  if (data?.confirmEmail === false) {
    return (
      <Navigate
        to="/email-confirmed"
        state={{
          header: "Email not confirmed",
          title: "Email not confirmed",
          text: "There was an error while trying to confirm your email. Please try again.",
          status: "error",
        }}
      />
    );
  }

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
        <Loader />
        <Typography variant="h4" mt={4}>
          Confirming your email...
        </Typography>
      </Stack>
    </AppContainer>
  );
}
