import { Button, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { Steps } from "../Auth";
import AuthFormContainer from "./AuthFormContainer";

export default function SignUpForm({
  email,
  setAuthStep,
}: {
  email: string;
  setAuthStep: React.Dispatch<React.SetStateAction<Steps>>;
}) {
  return (
    <AuthFormContainer title="Finish signing up" setAuthStep={setAuthStep} back>
      <Formik
        initialValues={{
          firstName: "",
          email,
          password: "",
        }}
        // validationSchema={loginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          //   const error = await submit(values);
          //   if (error) setErrors(error);
          //   else onFinish();
        }}
      >
        {() => (
          <Stack component={Form} gap={3}>
            <Field name="firstName" label="First name" component={TextInput2} />
            <Field name="email" label="Email" component={TextInput2} />
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextInput2}
            />
            <Typography fontSize="0.75rem">
              By selecting <b>Agree and continue</b>, I agree to Airbnsea’s
              Terms of Service, Payments Terms of Service, and Nondiscrimination
              Policy and acknowledge the Privacy Policy.
            </Typography>
            <Button variant="contained" type="submit" color="primary">
              Agree and continue
            </Button>
          </Stack>
        )}
      </Formik>
    </AuthFormContainer>
  );
}
