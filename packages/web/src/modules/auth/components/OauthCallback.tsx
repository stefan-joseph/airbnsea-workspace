import { Stack, Typography } from "@mui/material";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import {
  AuthorizationServer,
  useAuthenticateUserWithOauthMutation,
} from "@airbnb-clone/controller";

import Loader from "../../../components/Loader";
import { useEffect } from "react";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import { AppContainer } from "../../../components/AppContainer";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import { Steps } from "../Auth";

export default function OauthCallback() {
  let { authServer } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const state2 = searchParams.get("state");
  const code = searchParams.get("code");

  const setUserAndRedirect = useSetUserAndRedirect();

  const [authenticateUserWithOauthMutation] =
    useAuthenticateUserWithOauthMutation();

  const authServerStr = authServer === "linkedin" ? "linkedIn" : authServer;

  async function runAuthenticationProcess() {
    if (code && state2 === localStorage.getItem("latestCSRFToken")) {
      authServer = authServer?.toUpperCase();
      if (
        authServer === AuthorizationServer["Github"] ||
        authServer === AuthorizationServer["Linkedin"]
      ) {
        const response = await authenticateUserWithOauthMutation({
          variables: { code, authServer },
        }).catch((error) =>
          navigate("/login", {
            state: {
              message: error?.message,
            },
          })
        );

        if (!response?.data) return;
        const { authenticateUserWithOauth } = response.data;
        const { __typename } = authenticateUserWithOauth;

        console.log("response.data", response.data);

        if (__typename === "SuccessResponse") {
          setUserAndRedirect();
        } else if (__typename === "UserAlreadyExists") {
          const { email, firstName, avatar } = authenticateUserWithOauth;
          navigate("/login", {
            state: {
              step: Steps.EXISTS,
              email,
              firstName,
              avatar,
            },
          });
        } else if (__typename === "UserExistsWithOAuth") {
          const { email, firstName, avatar, authorizationServer } =
            authenticateUserWithOauth;
          navigate("/login", {
            state: {
              step: Steps.OAUTHOTHER,
              email,
              firstName,
              avatar,
              authorizationServer,
            },
          });
        }
      }
    }
  }

  useEffect(() => {
    runAuthenticationProcess();
  }, []);

  // useEffect(() => {
  //   if (!error) return;
  //   navigate("/login", {
  //     state: {
  //       message: error?.message,
  //     },
  //   });
  // }, [error]);

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
