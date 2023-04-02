import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { resetPasswordSchema } from "@airbnb-clone/common";
import { ResetPasswordMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Button, Stack, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { AuthPageContainer } from "../components/AuthPageContainer";

interface Props {
  submit: (
    values: ResetPasswordMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const ResetPasswordView = ({ submit, onFinish }: Props) => {
  const { key } = useParams();

  return (
    <AuthPageContainer>
      <Formik
        initialValues={{
          newPassword: "",
          newPassword2: "",
        }}
        validationSchema={resetPasswordSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async ({ newPassword }, { setErrors }) => {
          const error = await submit({
            newPassword,
            key: key as string,
          });
          if (error) setErrors(error);
          else onFinish();
        }}
      >
        {({ isValid }) => (
          <Form>
            <Stack
              sx={{
                maxWidth: "35ch",
              }}
              spacing={2}
            >
              <Field
                name="newPassword"
                type="password"
                label="New Password"
                size="small"
                component={TextInput2}
              />
              <Field
                name="newPassword2"
                type="password"
                label="Retype New Password"
                size="small"
                component={TextInput2}
              />
              <Typography>
                <Button
                  type="submit"
                  disabled={!isValid}
                  variant="contained"
                  color="primary"
                >
                  Reset Password
                </Button>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthPageContainer>
  );
};
