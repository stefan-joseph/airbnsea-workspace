import { Button, Stack, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { Link } from "react-router-dom";

export default function PasswordForm({
  email,
  setAuthStep,
}: {
  email: string;
  setAuthStep: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Formik
      initialValues={{
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
          <Field
            name="password"
            type="password"
            label="Password"
            component={TextInput2}
          />
          <Button variant="contained" type="submit" color="primary">
            Log in
          </Button>
          <Stack component={Link} to="/forgot-password" ml="auto">
            <Typography fontWeight={600} sx={{ textDecoration: "underline" }}>
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
}
