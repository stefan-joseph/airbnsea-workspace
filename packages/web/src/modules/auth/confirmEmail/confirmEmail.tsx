import { Stack, Typography } from "@mui/material";
import { Loader } from "../../../components/Loader";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { appSidePadding } from "../../../constants/constants";
import { Navigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "@airbnb-clone/controller";
import { useEffect } from "react";

export default function ConfirmEmail() {
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
        to="/message/email-confirmation"
        state={{ message: "Your email has been confirmed." }}
      />
    );
  }

  if (data?.confirmEmail === false) {
    console.log("YOLO", data?.confirmEmail);
    return (
      <Navigate
        to="/message/email-confirmation"
        state={{
          message:
            "Your email could not be confirmed at this time. Please try again.",
        }}
      />
    );
  }

  return (
    <AuthPageContainer>
      <Stack gap={5} m={appSidePadding}>
        <Loader />
        <Typography variant="h4">Confirming your email</Typography>
      </Stack>
    </AuthPageContainer>
  );
}
