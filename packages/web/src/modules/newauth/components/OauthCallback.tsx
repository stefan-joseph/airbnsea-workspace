import { Stack, Typography } from "@mui/material";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  AuthorizationServer,
  useAuthenticateUserWithOauthMutation,
  useAuthenticateUserWithLinkedinMutation,
} from "@airbnb-clone/controller";

import Loader from "../../../components/Loader";
import { useEffect } from "react";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import { AppContainer } from "../../../components/AppContainer";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

export default function OauthCallback() {
  const { authServer } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const state2 = searchParams.get("state");
  const code = searchParams.get("code");

  const setUserAndRedirect = useSetUserAndRedirect();

  const [authenticateUserWithOauthMutation, { data, error }] =
    useAuthenticateUserWithOauthMutation();

  const [authenticateUserWithLinkedinMutation, { data: data2, error: error2 }] =
    useAuthenticateUserWithLinkedinMutation();

  const authServerStr = authServer === "linkedin" ? "linkedIn" : authServer;

  useEffect(() => {
    if (code && state2 === localStorage.getItem("latestCSRFToken")) {
      if (authServer === AuthorizationServer["Github"].toLowerCase()) {
        authenticateUserWithOauthMutation({ variables: { code } });
      } else if (authServer === AuthorizationServer["Linkedin"].toLowerCase()) {
        authenticateUserWithLinkedinMutation({ variables: { code } });
      }
      // don't want to navigate to './login'
      return;
    }

    navigate("/login", {
      state: {
        message: `Could not access your ${capitalizeFirstLetter(
          authServerStr
        )} credentials at this time`,
      },
    });
  }, []);

  useEffect(() => {
    if (error || error2) {
      // const { message } = error;
      navigate("/login", {
        state: {
          message: error?.message || error2?.message,
        },
      });
    } else if (data || data2) {
      setUserAndRedirect();
    }
  }, [error, data, error2, data2]);

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" width="100%" mt="auto">
        <Loader />
        <Typography fontWeight={600} mt={4} fontSize={18}>
          Connecting your {capitalizeFirstLetter(authServerStr)} account...
        </Typography>
      </Stack>
    </AppContainer>
  );
}
