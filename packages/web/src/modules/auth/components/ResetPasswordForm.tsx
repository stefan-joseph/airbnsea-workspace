import { Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { resetPasswordSchemaWithPassword2 } from "@airbnb-clone/common";
import { useResetPasswordMutation } from "@airbnb-clone/controller";
import { Link, useParams } from "react-router-dom";

import { AppContainer } from "../../../components/AppContainer";
import AuthFormContainer from "./AuthFormContainer";
import LoadingButton from "../../../components/LoadingButton";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { measureMemory } from "vm";
import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { theme } from "../../../MuiTheme";

export default function ResetPasswordForm() {
  const { key } = useParams();

  const [resetSuccess, setResetSuccess] = useState(false);

  const [resetPasswordMutation, { error, loading }] =
    useResetPasswordMutation();

  if (resetSuccess) {
    return (
      <AppContainer>
        <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
          <AuthFormContainer
            header="Password updated"
            error={error?.message}
            HeaderIcon={
              <IoCheckmarkCircle size={26} color={theme.palette.success.main} />
            }
          >
            <Stack alignItems="center">
              <Typography>Your password has been updated.</Typography>
              <Typography mt={2}>
                Please log in with your updated password.
              </Typography>
            </Stack>
            <Stack component={Link} to="/login" mt={6}>
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
    <AppContainer>
      <Stack justifyContent="center" alignItems="center" mt={10} mb={5}>
        <AuthFormContainer header="Update password" error={error?.message}>
          <Formik
            initialValues={{
              newPassword: "",
              newPassword2: "",
            }}
            validationSchema={resetPasswordSchemaWithPassword2}
            onSubmit={async (values, { setFieldError }) => {
              const { data } = await resetPasswordMutation({
                variables: { ...values, key: key as string },
              });

              if (!data || error) return;
              const { resetPassword } = data;
              const { __typename } = resetPassword;

              if (__typename === "ValidationError") {
                const { field, message } = resetPassword;
                setFieldError(field, message);
              } else if (__typename == "SuccessResponse") {
                setResetSuccess(true);
              }
            }}
          >
            {() => (
              <Stack component={Form} gap={3}>
                <Typography>Must be at least 6 characters long.</Typography>
                <Field
                  name="newPassword"
                  type="password"
                  label="Password"
                  component={TextInput2}
                />
                <Field
                  name="newPassword2"
                  type="password"
                  label="Re-enter your password"
                  component={TextInput2}
                />
                <LoadingButton text="Update" loading={loading} color="info" />
              </Stack>
            )}
          </Formik>
        </AuthFormContainer>
      </Stack>
    </AppContainer>
  );
}
