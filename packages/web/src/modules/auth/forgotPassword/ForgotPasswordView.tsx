import { Field, Form, Formik } from "formik";
import { forgotPasswordSchema } from "@airbnb-clone/common";
import { SendForgotPasswordEmailMutationVariables } from "@airbnb-clone/controller";
import { Button, Stack, Typography } from "@mui/material";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { Link } from "react-router-dom";
import { AuthPageContainer } from "../components/AuthPageContainer";

interface Props {
  submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
  onFinish: () => void;
}

export const ForgotPasswordView = ({ submit, onFinish }: Props) => {
  return (
    <AuthPageContainer>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={forgotPasswordSchema}
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
              <Button type="submit" variant="contained" color="primary">
                Reset Password
              </Button>
              <Typography>
                Remember something?{" "}
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
