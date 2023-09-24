import { Link, useLocation } from "react-router-dom";
import { Field, Formik } from "formik";
import { loginSchema } from "@airbnb-clone/common";
import { LoginUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Button, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { useLoginAsRandomUserMutation } from "@airbnb-clone/controller";
import { AuthPageContainer } from "../components/AuthPageContainer";
import AuthFormContainer from "../components/AuthFormContainer";

interface Props {
  submit: (
    values: LoginUserMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const LoginView = ({ onFinish, submit }: Props) => {
  const location = useLocation();

  const [loginAsRandomUserMutation, { client }] =
    useLoginAsRandomUserMutation();

  return (
    <AuthPageContainer>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          const error = await submit(values);
          if (error) setErrors(error);
          else onFinish();
        }}
      >
        {() => (
          <AuthFormContainer
            title="Log in to Your Account"
            subtitle="If you'd like to try the application out without signing up click the 'log in as test user' button to sign in to an auto-generated account."
          >
            <Button
              onClick={async () => {
                const { data } = await loginAsRandomUserMutation();

                if (data?.loginAsRandomUser.sessionId) {
                  await client.resetStore();
                  onFinish();
                }
              }}
            >
              Log in as test user
            </Button>
            {location.state?.message && (
              <Typography fontWeight={600}>{location.state.message}</Typography>
            )}
            <Field name="email" label="Email" component={TextInput2} />
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextInput2}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log in
            </Button>
            <Typography>
              Not a member?{" "}
              <Link to="/register">
                <Button type="button">Sign up</Button>
              </Link>
            </Typography>
            <Typography>
              Minds blanking?{" "}
              <Link to="/forgot-password">
                <Button type="button">Forgot Password</Button>
              </Link>
            </Typography>
          </AuthFormContainer>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
