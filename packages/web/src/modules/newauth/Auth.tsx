import { useState } from "react";
import { Stack } from "@mui/material";

import { AppContainer } from "../../components/AppContainer";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import SignUpForm from "./components/SignUpForm";
import OAuthReminder from "./components/OAuthReminder";
import { AuthorizationServer } from "@airbnb-clone/controller";

export enum Steps {
  DEFAULT = "default",
  PASSWORD = "password",
  SIGNUP = "sign up",
  OAUTH = "oauth",
}

export type User = {
  email: string;
  firstName: string;
  avatar: string;
  authorizationServer: AuthorizationServer;
};

export default function Auth() {
  const [authStep, setAuthStep] = useState(Steps.DEFAULT);
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    avatar: "",
    authorizationServer: AuthorizationServer["Google"],
  });

  const AuthStepConfigs: Record<Steps, JSX.Element> = {
    [Steps.DEFAULT]: (
      <EmailForm user={user} setAuthStep={setAuthStep} setUser={setUser} />
    ),
    [Steps.PASSWORD]: (
      <PasswordForm setAuthStep={setAuthStep} email={user.email} />
    ),

    [Steps.SIGNUP]: <SignUpForm setAuthStep={setAuthStep} email={user.email} />,

    [Steps.OAUTH]: <OAuthReminder setAuthStep={setAuthStep} user={user} />,
  };

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10}>
        {AuthStepConfigs[authStep]}
      </Stack>
    </AppContainer>
  );
}
