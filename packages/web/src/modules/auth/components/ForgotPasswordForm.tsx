import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { forgotPasswordSchema } from "@airbnb-clone/common";
import { useSendForgotPasswordEmailMutation } from "@airbnb-clone/controller";
import { Icon, Stack, Typography } from "@mui/material";
import { IoCheckmarkCircle, IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { TextInput2 } from "../../../components/fields/TextInput2";
import AuthFormContainer from "./AuthFormContainer";
import LoadingButton from "../../../components/LoadingButton";
import { AppContainer } from "../../../components/AppContainer";
import { theme } from "../../../MuiTheme";

export default function ForgotPasswordForm() {
  const [passwordResentEmail, setPasswordResentEmail] = useState<String>();

  const [sendForgotPasswordEmailMutation, { error, loading }] =
    useSendForgotPasswordEmailMutation();

  if (passwordResentEmail) {
    return (
      <AppContainer withoutSearch>
        <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
          <AuthFormContainer
            header="Reset link sent"
            error={error?.message}
            HeaderIcon={
              <IoCheckmarkCircle size={26} color={theme.palette.success.main} />
            }
          >
            <Stack alignItems="center">
              <Typography>
                A link to reset your password has been sent to:
              </Typography>
              <Stack flexDirection="row" mt={2} mb={4}>
                <Icon>
                  <IoMailOutline size={16} />
                </Icon>
                <Typography fontWeight={300} ml={0.2}>
                  {passwordResentEmail}
                </Typography>
              </Stack>
            </Stack>
            <Stack component={Link} to="/login" mt={4}>
              <Typography fontWeight={600} sx={{ textDecoration: "underline" }}>
                Return to log in
              </Typography>
            </Stack>
          </AuthFormContainer>
        </Stack>
      </AppContainer>
    );
  }

  return (
    <AppContainer withoutSearch>
      <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
        <AuthFormContainer header="Forgot password?" error={error?.message}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={forgotPasswordSchema}
            onSubmit={async (values, { setFieldError }) => {
              const { data } = await sendForgotPasswordEmailMutation({
                variables: values,
              });

              if (!data) return;
              const { sendForgotPasswordEmail } = data;
              const { __typename } = sendForgotPasswordEmail;

              if (__typename === "ValidationError") {
                const { message, field } = sendForgotPasswordEmail;
                setFieldError(field, message);
              } else if (__typename === "ForgotPasswordEmailSuccessResponse") {
                const { email } = sendForgotPasswordEmail;
                setPasswordResentEmail(email);
              }
            }}
          >
            {() => (
              <Stack component={Form}>
                <Typography mb={2}>
                  Enter the email address associated with your account, and
                  we’ll email you a link to reset your password.
                </Typography>
                <Field name="email" label="Email" component={TextInput2} />
                <Stack mt={6}>
                  <LoadingButton
                    text="Send reset link"
                    loading={loading}
                    color="info"
                  />
                </Stack>
                <Stack component={Link} to="/login" mt={4}>
                  <Typography
                    fontWeight={600}
                    sx={{ textDecoration: "underline" }}
                  >
                    Return to log in
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Formik>
        </AuthFormContainer>
      </Stack>
    </AppContainer>
  );
}
