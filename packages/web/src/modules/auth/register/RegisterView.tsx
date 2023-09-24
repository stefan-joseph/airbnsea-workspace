import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { validUserSchema } from "@airbnb-clone/common";
import { RegisterUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Button, Stack, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { AuthPageContainer } from "../components/AuthPageContainer";
import AuthFormContainer from "../components/AuthFormContainer";

interface Props {
  submit: (
    values: RegisterUserMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const RegisterView = ({ submit, onFinish }: Props) => {
  return (
    <AuthPageContainer>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validUserSchema}
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
            <Field name="email" label="Email" component={TextInput2} />
            <Field
              name="password"
              type="password"
              label="Password"
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
