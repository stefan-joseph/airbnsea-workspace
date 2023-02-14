import { useCreateMessageMutation } from "@airbnb-clone/controller";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Field, Formik, Form, FieldProps } from "formik";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { messageSchema } from "@airbnb-clone/common";

interface Props {
  listingId: string | undefined;
}

export const CreateMessage = ({ listingId }: Props) => {
  const [createMessageMutation] = useCreateMessageMutation();

  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async ({ text }, { resetForm }) => {
        if (!listingId) return;
        console.log("SUBMIT", text);
        await createMessageMutation({
          variables: { listingId, text },
        });
        resetForm();
      }}
      validationSchema={messageSchema}
      validateOnMount={true}
    >
      {() => (
        <Form>
          <Field name="text">
            {({ field: { ...field }, form: { isValid } }: FieldProps) => (
              <OutlinedInput
                {...field}
                placeholder="Type a message"
                multiline
                fullWidth
                color="info"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      color="info"
                      disabled={!isValid}
                      sx={{ backgroundColor: "#FFF", mr: -1 }}
                    >
                      <BsFillArrowUpCircleFill />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  padding: 1.4,
                  "& fieldset": {
                    borderRadius: 8,
                  },
                }}
              />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};
