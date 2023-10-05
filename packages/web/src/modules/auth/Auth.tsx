import { useState } from "react";
import { Stack } from "@mui/material";

import { AppContainer } from "../../components/AppContainer";
import EmailForm from "./steps/EmailForm";
import PasswordForm from "./steps/PasswordForm";
import SignUpForm from "./steps/SignUpForm";
import OAuthReminder from "./steps/OAuthReminder";
import { AuthorizationServer } from "@airbnb-clone/controller";
import ConfirmEmailReminder from "./steps/ConfirmEmailReminder";

export enum Steps {
  DEFAULT = "default",
  PASSWORD = "password",
  SIGNUP = "sign up",
  OAUTH = "oauth",
  CONFIRM = "confirm",
  EXISTS = "exists",
}

export type User = {
  email: string;
  firstName: string;
  avatar: string;
  authorizationServer?: AuthorizationServer;
};

export default function Auth() {
  const [authStep, setAuthStep] = useState(Steps.DEFAULT);
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    avatar: "",
    // authorizationServer: AuthorizationServer["Linkedin"],
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
    [Steps.CONFIRM]: (
      <ConfirmEmailReminder setAuthStep={setAuthStep} user={user} />
    ),
    [Steps.EXISTS]: (
      <PasswordForm setAuthStep={setAuthStep} user={user} alreadyExists />
    ),

    // need to add 'email already in use' step
  };

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
        {AuthStepConfigs[authStep]}
      </Stack>
    </AppContainer>
  );
}
