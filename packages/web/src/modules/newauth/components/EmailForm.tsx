import { Button, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { useCheckEmailLazyQuery } from "@airbnb-clone/controller";
import { checkEmailSchema } from "@airbnb-clone/common";
import TransitionAlerts from "./TransitionAlerts";

export default function EmailForm({
  setAuthStep,
  setEmail,
}: {
  setAuthStep: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [checkEmailLazyQuery, { data, error, loading }] =
    useCheckEmailLazyQuery();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      //   validationSchema={checkEmailSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);

        const { data, error } = await checkEmailLazyQuery({
          variables: values,
        });

        if (error) {
          console.log(error);
          return;
        }

        if (data?.checkEmail.__typename === "BadCredentialsError") {
          const { field, message } = data?.checkEmail;
          setFieldError(field, message);
          return;
        }

        setEmail(values.email);
        if (data?.checkEmail?.__typename === "CheckEmailResponse") {
          if (data.checkEmail.oAuth) {
            return;
          }
          setAuthStep("password");
        } else {
          setAuthStep("sign up");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Stack component={Form} gap={3}>
          {error && <TransitionAlerts severity="error" text={error.message} />}
          <Field name="email" label="Email" component={TextInput2} />
          <Button
            disabled={isSubmitting}
            variant="contained"
            type="submit"
            color="primary"
          >
            Continue
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
