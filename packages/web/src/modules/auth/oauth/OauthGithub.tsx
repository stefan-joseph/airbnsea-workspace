import { Stack, Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthenticateUserWithOauthMutation } from "@airbnb-clone/controller";

import { Loader } from "../../../components/Loader";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { useEffect } from "react";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";

export default function OauthGithub() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const state2 = searchParams.get("state");
  const code = searchParams.get("code");

  const setUserAndRedirect = useSetUserAndRedirect();

  const [authenticateUserWithOauthMutation, { data, error, loading }] =
    useAuthenticateUserWithOauthMutation({
      variables: { code: code as string },
    });

  useEffect(() => {
    if (state2 !== localStorage.getItem("latestCSRFToken")) {
      navigate("/register");
    } else {
      authenticateUserWithOauthMutation();
    }
  }, []);

  useEffect(() => {
    if (error) {
      const { message } = error;
      navigate("/register", { state: { message } });
    } else if (data) {
      setUserAndRedirect();
    }
  }, [error, data]);

  return (
    <AuthPageContainer>
      <Stack>
        <Loader />
        <Typography>Connecting your Github account...</Typography>
      </Stack>
    </AuthPageContainer>
  );
}
