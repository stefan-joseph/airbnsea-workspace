import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { validUserSchema } from "@airbnb-clone/common";
import { RegisterUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Button, Stack, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { AuthPageContainer } from "../components/AuthPageContainer";

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
          <Form>
            <Stack
              sx={{
                maxWidth: "35ch",
              }}
              spacing={2}
            >
              <Field
                name="email"
                label="Email"
                size="small"
                component={TextInput2}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                size="small"
                component={TextInput2}
              />

              <Button variant="contained" type="submit" color="primary">
                Sign up
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
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
