import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "@airbnb-clone/common";
import { LoginUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Button, Skeleton, Stack, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { useGetRandomUserCredentailsLazyQuery } from "@airbnb-clone/controller";
import { AuthPageContainer } from "../components/AuthPageContainer";

interface Props {
  submit: (
    values: LoginUserMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const LoginView = ({ onFinish, submit }: Props) => {
  const [getRandomUserCredentails, { data, loading }] =
    useGetRandomUserCredentailsLazyQuery();

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
          console.log(values);
          const error = await submit(values);
          if (error) setErrors(error);
          else onFinish();
        }}
      >
        {({ setSubmitting, setFieldValue, setErrors }) => (
          <Form>
            <Stack
              sx={{
                maxWidth: "35ch",
              }}
              spacing={2}
            >
              <Button
                onClick={async () => {
                  const { data, error } = await getRandomUserCredentails();

                  console.log(data);
                  console.log(error?.message);

                  if (data?.getRandomUserCredentails) {
                    setFieldValue(
                      "email",
                      data?.getRandomUserCredentails.email
                    );
                    setFieldValue(
                      "password",
                      data?.getRandomUserCredentails.password
                    );
                  } else if (error) {
                    // make general error with useState instead of error for specific field ??
                  }
                }}
              >
                Test User
              </Button>
              {loading ? (
                <Skeleton variant="rounded" height={34} />
              ) : (
                <Field
                  name="email"
                  label="Email"
                  size="small"
                  component={TextInput2}
                />
              )}
              {loading ? (
                <Skeleton variant="rounded" height={34} />
              ) : (
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  size="small"
                  component={TextInput2}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Log in
              </Button>
              <Typography>
                Not a member?{" "}
                <Link to="/register">
                  <Button type="button">Register</Button>
                </Link>
              </Typography>
              <Typography>
                Minds blanking?{" "}
                <Link to="/forgot-password">
                  <Button type="button">Forgot Password</Button>
                </Link>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
