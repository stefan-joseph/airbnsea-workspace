import { Stack, Typography } from "@mui/material";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import {
  AuthorizationServer,
  useAuthenticateUserWithOauthMutation,
  useAuthenticateUserWithLinkedinMutation,
  useAuthenticateUserWithGithubMutation,
} from "@airbnb-clone/controller";

import Loader from "../../../components/Loader";
import { useEffect } from "react";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import { AppContainer } from "../../../components/AppContainer";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

export default function OauthCallback() {
  let { authServer } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const state2 = searchParams.get("state");
  const code = searchParams.get("code");

  const setUserAndRedirect = useSetUserAndRedirect();

  const [authenticateUserWithOauthMutation, { error }] =
    useAuthenticateUserWithOauthMutation();

  // const [authenticateUserWithLinkedinMutation, { data: data2, error: error2 }] =
  //   useAuthenticateUserWithLinkedinMutation();

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

        if (__typename === "SuccessResponse") {
          setUserAndRedirect();
        }
      }
      // if (authServer === AuthorizationServer["Github"].toLowerCase()) {
      //   authenticateUserWithOauthMutation({ variables: { code } });
      // } else if (authServer === AuthorizationServer["Linkedin"].toLowerCase()) {
      //   authenticateUserWithLinkedinMutation({ variables: { code } });
      // }
      // don't want to navigate to './login'
      return;
    }

    // navigate("/login", {
    //   state: {
    //     message: `Could not access your ${capitalizeFirstLetter(
    //       authServerStr
    //     )} credentials at this time`,
    //   },
    // });
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
