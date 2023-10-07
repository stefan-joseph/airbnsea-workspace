import { useState } from "react";
import { Stack } from "@mui/material";

import { AppContainer } from "../../components/AppContainer";
import EmailForm from "./steps/EmailForm";
import PasswordForm from "./steps/PasswordForm";
import SignUpForm from "./steps/SignUpForm";
import OAuthReminder from "./steps/OAuthReminder";
import { AuthorizationServer } from "@airbnb-clone/controller";
import ConfirmEmailReminder from "./steps/ConfirmEmailReminder";
import { useLocation } from "react-router-dom";

export enum Steps {
  DEFAULT = "default",
  PASSWORD = "password",
  SIGNUP = "sign up",
  OAUTH = "oauth",
  CONFIRM = "confirm",
  EXISTS = "exists",
  OAUTHOTHER = "oauth other",
}

export type User = {
  email: string;
  firstName: string;
  avatar: string;
  authorizationServer?: AuthorizationServer;
};

export default function Auth() {
  const { state } = useLocation();

  if (state?.authorizationServer) {
  }
  console.log(
    Object.values(AuthorizationServer).includes(state?.authorizationServer)
  );

  // make sure step has proper cast
  const step: Steps = Object.values(Steps).includes(state?.step)
    ? state.step
    : Steps.DEFAULT;

  const [authStep, setAuthStep] = useState(step);

  // make sure authorization server has proper cast
  const authorizationServer: AuthorizationServer = Object.values(
    AuthorizationServer
  ).includes(state?.authorizationServer)
    ? state.authorizationServer
    : undefined;

  const [user, setUser] = useState<User>({
    email: state?.email || "",
    firstName: state?.firstName || "",
    avatar: state?.avatar || "",
    authorizationServer,
  });

  const AuthStepConfigs: Record<Steps, JSX.Element> = {
    [Steps.DEFAULT]: (
      <EmailForm user={user} setAuthStep={setAuthStep} setUser={setUser} />
    ),
    [Steps.PASSWORD]: <PasswordForm setAuthStep={setAuthStep} user={user} />,
    [Steps.SIGNUP]: (
      <SignUpForm
        setAuthStep={setAuthStep}
        setUser={setUser}
        email={user.email}
      />
    ),
    [Steps.OAUTH]: <OAuthReminder setAuthStep={setAuthStep} user={user} />,
    [Steps.OAUTHOTHER]: (
      <OAuthReminder setAuthStep={setAuthStep} user={user} alreadyMessage />
    ),
    [Steps.CONFIRM]: (
      <ConfirmEmailReminder setAuthStep={setAuthStep} user={user} />
    ),
    [Steps.EXISTS]: (
      <PasswordForm setAuthStep={setAuthStep} user={user} alreadyExists />
    ),
  };

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
        {AuthStepConfigs[authStep]}
      </Stack>
    </AppContainer>
  );
}
