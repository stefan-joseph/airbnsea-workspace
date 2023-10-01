import { Button, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { useCheckEmailLazyQuery } from "@airbnb-clone/controller";
import { checkEmailSchema } from "@airbnb-clone/common";
import TransitionAlerts from "./TransitionAlerts";
import OrDivider from "./OrDivider";
import OauthLink from "./OauthLink";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import AuthFormContainer from "./AuthFormContainer";
import { Steps, User } from "../Auth";

export default function EmailForm({
  user,
  setUser,
  setAuthStep,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const [checkEmailLazyQuery, { data, error, loading }] =
    useCheckEmailLazyQuery();

  return (
    <AuthFormContainer
      title="Log in or sign up"
      welcome
      setAuthStep={setAuthStep}
    >
      <Formik
        initialValues={{
          email: user.email,
        }}
        validationSchema={checkEmailSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          const { data, error } = await checkEmailLazyQuery({
            variables: values,
          });

          if (error) {
            console.log(error);
            return;
          }

          if (!data) return;
          const { checkEmail } = data;
          const { __typename } = checkEmail;

          if (__typename === "BadCredentialsError") {
            const { field, message } = checkEmail;
            setFieldError(field, message);
            return;
          }

          if (__typename === "EmailExistsWithOAuth") {
            const { authorizationServer, email, firstName, avatar } =
              checkEmail;
            setAuthStep(Steps.OAUTH);
            setUser({
              email,
              firstName,
              avatar: avatar || "",
              authorizationServer,
            });
          } else if (__typename === "EmailExistsWithPassword") {
            const { email } = checkEmail;
            setAuthStep(Steps.PASSWORD);
            setUser({ ...user, email });
          } else if (__typename === "NoUserWithThisEmail") {
            const { email } = checkEmail;
            setAuthStep(Steps.SIGNUP);
            setUser({ ...user, email });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Stack component={Form} gap={3}>
            {error && (
              <TransitionAlerts severity="error" text={error.message} />
            )}
            <Field name="email" label="Email" component={TextInput2} />
            <Button
              disabled={isSubmitting}
              variant="contained"
              type="submit"
              color="primary"
            >
              Continue
            </Button>
          </Stack>
        )}
      </Formik>
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
    </AuthFormContainer>
  );
}
