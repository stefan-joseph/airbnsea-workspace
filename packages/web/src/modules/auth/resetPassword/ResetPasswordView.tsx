import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { resetPasswordSchema } from "@airbnb-clone/common";
import { ResetPasswordMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";
import { Box, Button, Stack, Typography } from "@mui/material";

import { TextInput2 } from "../../../components/fields/TextInput2";
import { HomeIcon } from "../../../components/HomeIcon";

interface Props {
  submit: (
    values: ResetPasswordMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const ResetPasswordView = ({ submit, onFinish }: Props) => {
  const { key } = useParams();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HomeIcon
        sx={{
          position: "absolute",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          fontSize: { xs: 26, md: 30 },
        }}
      />
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
                  variant="contained"
                  type="submit"
                  disabled={!isValid}
                  fullWidth
                >
                  Reset Password
                </Button>
              </Typography>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
