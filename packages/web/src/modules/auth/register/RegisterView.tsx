import { Field, Formik } from "formik";
import { registerUserSchemaWithPassword2 } from "@airbnb-clone/common";
import { RegisterUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Button, Stack } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { AuthPageContainer } from "../components/AuthPageContainer";
import AuthFormContainer from "../components/AuthFormContainer";

import AuthLink from "../components/AuthLink";

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
          password2: "",
          firstName: "",
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
          <AuthFormContainer
            title="Sign up for an Account"
            type="sign up"
            buttonLabel="Create My Account"
            authLink1={{
              href: "/forgot-password",
              text: "Forgot Your Password?",
            }}
            authLink2={{ href: "/login", text: "Have an Account?" }}
          >
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
            <Field name="firstName" label="First Name" component={TextInput2} />
          </AuthFormContainer>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
