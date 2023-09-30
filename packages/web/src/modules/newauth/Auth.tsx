import { useState } from "react";
import { Divider, Stack } from "@mui/material";

import { AppContainer } from "../../components/AppContainer";
import AuthForm from "./components/AuthForm";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import SignUpForm from "./components/SignUpForm";
import OauthLink from "./components/OauthLink";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import OrDivider from "./components/OrDivider";

function getAuthFormProps(step: string) {
  switch (step) {
    case "password":
      return { title: "Log in", back: "default" };
    case "sign up":
      return { title: "Finish signing up", back: "default" };
    default:
      return { title: "Log in or sign up", welcome: true };
  }
}

export default function Auth() {
  const [authStep, setAuthStep] = useState("default");
  const [email, setEmail] = useState("");

  const authFormProps = getAuthFormProps(authStep);

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10}>
        <AuthForm {...authFormProps} setAuthStep={setAuthStep}>
          {() => {
            switch (authStep) {
              case "password":
                return <PasswordForm setAuthStep={setAuthStep} email={email} />;
              case "sign up":
                return <SignUpForm setAuthStep={setAuthStep} email={email} />;
              case "github":
              default:
                return (
                  <>
                    <EmailForm setAuthStep={setAuthStep} setEmail={setEmail} />
                    <OrDivider />
                    <Stack gap={2}>
                      <OauthLink
                        href="https://google.com"
                        text="Continue with Google"
                        Icon={FcGoogle}
                      />
                      <OauthLink
                        href="https://github.com/login/oauth/authorize"
                        text="Continue with Github"
                        Icon={FaGithub}
                      />
                    </Stack>
                  </>
                );
            }
          }}
        </AuthForm>
      </Stack>
    </AppContainer>
  );
}
