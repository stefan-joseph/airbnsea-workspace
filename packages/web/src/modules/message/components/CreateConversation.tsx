import { Button, Stack, TextField } from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCreateConversationMutation } from "@airbnb-clone/controller";
import { messageSchema } from "@airbnb-clone/common";
import { OutlinedButton } from "../../../components/OutlinedButton";

export const CreateConversation = ({
  listingId,
  handleClose,
}: {
  listingId: string;
  handleClose?: () => void;
}) => {
  const [createConversation] = useCreateConversationMutation();

  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async ({ text }, { resetForm }) => {
        const { data } = await createConversation({
          variables: { listingId, text },
        });
        console.log("response", data);
        if (data?.createConversation.__typename == "Redirect") {
          window.location.href = data.createConversation.redirect;
        }
        resetForm();
      }}
      validationSchema={messageSchema}
      validateOnChange={true}
      validateOnBlur={false}
      validateOnMount={false}
    >
      {({ isValid }) => (
        <Form>
          <Stack gap={3}>
            <Field name="text">
              {({
                field: { ...field },
                form: { isValid, errors },
              }: FieldProps) => (
                <TextField
                  {...field}
                  error={!isValid}
                  helperText={errors.text && String(errors.text)}
                  color="info"
                  fullWidth
                  multiline
                  minRows={4}
                  sx={{
                    "& fieldset": {
                      borderRadius: 2,
                    },
                  }}
                />
              )}
            </Field>
            <Stack direction="row" marginLeft="auto" gap={2} mt={1}>
              {handleClose && <Button onClick={handleClose}>Close</Button>}
              <OutlinedButton
                text=" Send message"
                handleClick={() => undefined}
                type="submit"
                disabled={!isValid}
              />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
