import { useState } from "react";
import { ButtonBase, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useRegisterUserMutation } from "@airbnb-clone/controller";
import { registerUserSchema } from "@airbnb-clone/common";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { Steps, User } from "../Auth";
import AuthFormContainer from "../components/AuthFormContainer";
import { IoCheckmarkCircle } from "react-icons/io5";
import { theme } from "../../../MuiTheme";
import LoadingButton from "../../../components/LoadingButton";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import TermsOfService from "../components/TermsOfService";

export default function SignUpForm({
  email,
  setUser,
  setAuthStep,
}: {
  email: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const [signUpComplete, setSignUpComplete] = useState(false);

  const [registerUserMutation, { error, loading }] = useRegisterUserMutation();

  const setUserAndRedirect = useSetUserAndRedirect();

  if (signUpComplete) {
    return (
      <AuthFormContainer
        header="Your account has been created!"
        HeaderIcon={
          <IoCheckmarkCircle size={26} color={theme.palette.success.main} />
        }
        title="Please confirm your email"
      >
        <Typography>
          An email has been sent to the email address provided.
        </Typography>
        <Typography mt={2}>
          Please follow the link in the email to confirm your Airbnsea account.
          You will need to do this before logging in.
        </Typography>
        <Stack alignSelf="flex-start" mt={6}>
          <ButtonBase
            onClick={() => setAuthStep(Steps.DEFAULT)}
            sx={{ fontSize: 16, textDecoration: "underline", fontWeight: 600 }}
          >
            Return to login
          </ButtonBase>
        </Stack>
      </AuthFormContainer>
    );
  }
  return (
    <AuthFormContainer
      header="Finish signing up"
      setAuthStep={setAuthStep}
      error={error?.message}
    >
      <Formik
        initialValues={{
          firstName: "",
          email,
          password: "",
        }}
        validationSchema={registerUserSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { data } = await registerUserMutation({ variables: values });

          if (!data) return;
          const { register } = data;
          const { __typename } = register;

          if (__typename === "ValidationError") {
            const { field, message } = register;
            setFieldError(field, message);
          } else if (__typename === "SuccessResponse") {
            register.success && setSignUpComplete(true);
          } else if (__typename === "UserLogin") {
            register.success && setUserAndRedirect();
          } else if (__typename === "UserExistsWithOAuth") {
            const { authorizationServer, email, firstName, avatar } = register;
            setAuthStep(Steps.OAUTH);
            setUser({
              email,
              firstName,
              avatar: avatar || "",
              authorizationServer,
            });
          } else if (__typename === "UserExistsWithIncorrectPassword") {
            const { email, firstName, avatar } = register;
            setAuthStep(Steps.EXISTS);
            setUser({
              email,
              firstName,
              avatar: avatar || "",
            });
          }
        }}
      >
        {() => (
          <Stack component={Form} gap={3}>
            <Field name="firstName" label="First name" component={TextInput2} />
            <Field name="email" label="Email" component={TextInput2} />
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextInput2}
            />
            <TermsOfService />
            <LoadingButton text="Agree and continue" loading={loading} />
          </Stack>
        )}
      </Formik>
    </AuthFormContainer>
  );
}
