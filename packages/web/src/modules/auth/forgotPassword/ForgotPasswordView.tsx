import { Field, Form, Formik } from "formik";
import { forgotPasswordSchema } from "@airbnb-clone/common";
import { SendForgotPasswordEmailMutationVariables } from "@airbnb-clone/controller";
import { Button, Stack, Typography } from "@mui/material";
import { TextInput2 } from "../../../components/fields/TextInput2";
import { Link } from "react-router-dom";
import { AuthPageContainer } from "../components/AuthPageContainer";
import AuthFormContainer from "../components/AuthFormContainer";

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
          <AuthFormContainer
            title="Reset Your Password"
            subtitle="Enter the email associated with your account and we’ll send you password reset instructions."
            buttonLabel="Send Reset Instructions"
            authLink1={{
              href: "/login",
              text: "Return to Log in",
            }}
          >
            <Field name="email" label="Email" component={TextInput2} />
          </AuthFormContainer>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
