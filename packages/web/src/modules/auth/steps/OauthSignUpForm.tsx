import { useState } from "react";
import { ButtonBase, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useRegisterUserWithOauthMutation } from "@airbnb-clone/controller";
import { registerOAuthUserSchema } from "@airbnb-clone/common";
import { useSearchParams } from "react-router-dom";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { Steps, User } from "../Auth";
import AuthFormContainer from "../components/AuthFormContainer";
import { IoCheckmarkCircle } from "react-icons/io5";
import { theme } from "../../../MuiTheme";
import LoadingButton from "../../../components/LoadingButton";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import TermsOfService from "../components/TermsOfService";

export default function OauthSignUpForm({
  user,
  setUser,
  setAuthStep,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const [registerUserWithOauthMutation, { error, loading }] =
    useRegisterUserWithOauthMutation();

  const setUserAndRedirect = useSetUserAndRedirect();

  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");

  if (!key) {
    // if no key, reset to default login screen
    setAuthStep(Steps.DEFAULT);
    return null;
  }

  return (
    <AuthFormContainer
      header="Finish signing up"
      setAuthStep={setAuthStep}
      error={error?.message}
    >
      <Formik
        initialValues={{
          key,
          firstName: user?.firstName,
          email: user?.email,
        }}
        validationSchema={registerOAuthUserSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { data } = await registerUserWithOauthMutation({
            variables: values,
          });

          if (!data) return;
          const { registerUserWithOauth } = data;
          const { __typename } = registerUserWithOauth;

          if (__typename === "ValidationError") {
            const { field, message } = registerUserWithOauth;
            setFieldError(field, message);
          } else if (__typename === "SuccessResponse") {
            registerUserWithOauth.success && setUserAndRedirect();
          }
        }}
      >
        {() => (
          <Stack component={Form} gap={3}>
            <Field name="firstName" label="First name" component={TextInput2} />
            <Field name="email" label="Email" component={TextInput2} disabled />
            <TermsOfService />
            <LoadingButton text="Agree and continue" loading={loading} />
          </Stack>
        )}
      </Formik>
    </AuthFormContainer>
  );
}
