import { Link, useLocation } from "react-router-dom";
import { Field, Formik } from "formik";
import { registerUserSchemaWithPassword2 } from "@airbnb-clone/common";
import { RegisterUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Alert, Button, Divider, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { AuthPageContainer } from "../components/AuthPageContainer";
import AuthFormContainer from "../components/AuthFormContainer";
import OauthLink from "../components/OauthLink";
import TransitionAlerts from "../components/TransitionAlerts";

interface Props {
  submit: (
    values: RegisterUserMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const RegisterView = ({ submit, onFinish }: Props) => {
  const { state } = useLocation();
  return (
    <AuthPageContainer>
      <Formik
        initialValues={{
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={registerUserSchemaWithPassword2}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          const error = await submit(values);
          if (error) setErrors(error);
          else onFinish();
        }}
      >
        {() => (
          <AuthFormContainer title="Sign up for an Account">
            {state?.message && (
              <TransitionAlerts severity="error" text={state.message} />
            )}
            <OauthLink
              name="Sign up with Github"
              href="https://github.com/login/oauth/authorize"
            />
            <Divider
              sx={{
                fontSize: 14,
                span: {
                  opacity: 0.4,
                },
              }}
            >
              or
            </Divider>
            <Field name="email" label="Email" component={TextInput2} />
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextInput2}
            />
            <Field
              name="password2"
              type="password"
              label="Retype Password"
              component={TextInput2}
            />
            <Button variant="contained" type="submit" color="primary">
              Create My Account
            </Button>
            <Typography>
              Already a member?{" "}
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </Typography>
            <Typography>
              Minds blanking?{" "}
              <Link to="/forgot-password">
                <Button>Forgot Password</Button>
              </Link>
            </Typography>
          </AuthFormContainer>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
