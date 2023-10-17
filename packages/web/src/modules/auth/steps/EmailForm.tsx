import { Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  useCheckEmailLazyQuery,
  useLoginAsRandomUserMutation,
} from "@airbnb-clone/controller";
import { checkEmailSchema } from "@airbnb-clone/common";
import { useLocation } from "react-router-dom";

import { TextInput2 } from "../../../components/fields/TextInput2";
import OrDivider from "../components/OrDivider";
import OauthLink from "../components/OauthLink";
import AuthFormContainer from "../components/AuthFormContainer";
import { Steps, User } from "../Auth";
import TestUserButton from "../components/TestUserButton";
import LoadingButton from "../../../components/LoadingButton";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import getGithubClientId from "../../../utils/getGithubClientId";
import createLinkedinOauthLink from "../../../utils/createLinkedinOauthLink";
import createGithubOauthLink from "../../../utils/createGithubOauthLink";

export default function EmailForm({
  user,
  setUser,
  setAuthStep,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const { state } = useLocation();
  const [checkEmailLazyQuery, { error, loading }] = useCheckEmailLazyQuery({
    fetchPolicy: "no-cache",
  });

  const [loginAsRandomUserMutation, { error: error2, loading: loading2 }] =
    useLoginAsRandomUserMutation();

  return (
    <AuthFormContainer
      header="Log in or sign up"
      title="Welcome to Airbnsea"
      subtitle={
        <Typography fontSize={14}>
          If you'd like to try out the application without signing up, click{" "}
          <b>Continue as Test User</b> below to sign in to an auto-generated
          account.
        </Typography>
      }
      error={error?.message || error2?.message || state?.message}
    >
      <Formik
        initialValues={{
          email: user.email,
        }}
        validationSchema={checkEmailSchema}
        // validateOnBlur={false}
        // validateOnChange={false}
        onSubmit={async ({ email }, { setFieldError }) => {
          const { data } = await checkEmailLazyQuery({
            variables: { email: email.trim() },
          });

          if (!data) return;
          const { checkEmail } = data;
          const { __typename } = checkEmail;

          if (__typename === "ValidationError") {
            const { field, message } = checkEmail;
            setFieldError(field, message);
          } else if (__typename === "UserExistsWithOAuth") {
            const { authorizationServer, email, firstName, avatar } =
              checkEmail;
            setAuthStep(Steps.OAUTH);
            setUser({
              email,
              firstName,
              avatar: avatar || "",
              authorizationServer,
            });
          } else if (__typename === "UserExistsWithPassword") {
            const { email } = checkEmail;
            setAuthStep(Steps.PASSWORD);
            setUser({ ...user, email });
          } else if (__typename === "NoUserWithThisEmail") {
            const { email } = checkEmail;
            setAuthStep(Steps.SIGNUP);
            setUser({ ...user, email });
          } else if (__typename === "UserNotConfirmed") {
            const { email } = checkEmail;
            setAuthStep(Steps.CONFIRM);
            setUser({ ...user, email });
          }
        }}
      >
        {() => (
          <Stack component={Form} gap={3}>
            <Field name="email" label="Email" component={TextInput2} />
            <LoadingButton text="Continue" loading={loading || loading2} />
          </Stack>
        )}
      </Formik>
      <OrDivider />
      <Stack gap={2}>
        <OauthLink
          href="https://www.linkedin.com/oauth/v2/authorization"
          text="Continue with LinkedIn"
          Icon={<FaLinkedin color="#0077B5" />}
          getLink={createLinkedinOauthLink}
        />
        <OauthLink
          href="https://github.com/login/oauth/authorize"
          text="Continue with Github"
          Icon={<FaGithub />}
          getLink={createGithubOauthLink}
        />
        <TestUserButton handleClick={loginAsRandomUserMutation} />
      </Stack>
    </AuthFormContainer>
  );
}
