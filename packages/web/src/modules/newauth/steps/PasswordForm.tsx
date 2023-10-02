import { Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "@airbnb-clone/common";
import { useLoginUserMutation } from "@airbnb-clone/controller";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { Steps } from "../Auth";
import AuthFormContainer from "../components/AuthFormContainer";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";
import LoadingButton from "../../../components/LoadingButton";

export default function PasswordForm({
  email,
  setAuthStep,
}: {
  email: string;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  const [loginUserMutation, { error, loading }] = useLoginUserMutation();

  const setUserAndRedirect = useSetUserAndRedirect();

  return (
    <AuthFormContainer
      header="Log in"
      setAuthStep={setAuthStep}
      back
      error={error?.message}
    >
      <Formik
        initialValues={{
          email,
          password: "",
        }}
        validationSchema={loginSchema}
        validateOnBlur={false}
        validateOnChange={false}
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
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextInput2}
            />
            <LoadingButton text="Log in" loading={loading} />
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
