import { Avatar, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "@airbnb-clone/common";
import { useLoginUserMutation } from "@airbnb-clone/controller";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { Steps, User } from "../Auth";
import AuthFormContainer from "../components/AuthFormContainer";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import LoadingButton from "../../../components/LoadingButton";

export default function PasswordForm({
  user,
  alreadyExists,
  setAuthStep,
}: {
  user: User;
  alreadyExists?: boolean;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const [loginUserMutation, { error, loading }] = useLoginUserMutation();

  const setUserAndRedirect = useSetUserAndRedirect();

  const { email, firstName, avatar } = user;

  return (
    <AuthFormContainer
      header={alreadyExists ? "Account Exists" : "Log in"}
      setAuthStep={!alreadyExists ? setAuthStep : undefined}
      error={error?.message}
    >
      <Formik
        initialValues={{
          email,
          password: "",
        }}
        validationSchema={loginSchema}
        // validateOnBlur={false}
        // validateOnChange={false}
        onSubmit={async (values, { setFieldError }) => {
          const { data } = await loginUserMutation({ variables: values });

          if (!data) return;
          const { login } = data;
          const { __typename } = login;

          if (__typename === "ValidationError") {
            const { field, message } = login;
            setFieldError(field, message);
          } else if (__typename === "SuccessResponse") {
            login.success && setUserAndRedirect();
          }
        }}
      >
        {() => (
          <Stack component={Form} gap={3}>
            {alreadyExists && (
              <Stack alignItems="center">
                <Typography mb={3}>
                  Looks like you already have an account. Please log in instead.
                </Typography>
                <Avatar
                  src={avatar}
                  alt={firstName}
                  sx={{ width: 120, height: 120, fontSize: 40 }}
                />
                <Typography mt={3} fontWeight={300}>
                  {firstName}
                </Typography>
                <Typography fontWeight={300}>{email}</Typography>
              </Stack>
            )}
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextInput2}
            />
            <LoadingButton text="Log in" loading={loading} />
            {alreadyExists && (
              <Box>
                <ButtonBase
                  onClick={() => setAuthStep(Steps.DEFAULT)}
                  sx={{
                    fontSize: 16,
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
                  Log in with a different account
                </ButtonBase>
              </Box>
            )}
            <Stack component={Link} to="/forgot-password">
              <Typography fontWeight={600} sx={{ textDecoration: "underline" }}>
                Forgot Password?
              </Typography>
            </Stack>
          </Stack>
        )}
      </Formik>
    </AuthFormContainer>
  );
}
