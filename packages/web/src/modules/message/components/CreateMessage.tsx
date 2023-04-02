import { useCreateMessageMutation } from "@airbnb-clone/controller";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Field, Formik, Form, FieldProps } from "formik";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { messageSchema } from "@airbnb-clone/common";
import { useSearchParams } from "react-router-dom";

interface Props {
  conversationId: string | undefined;
}

export const CreateMessage = ({ conversationId }: Props) => {
  const [searchParams] = useSearchParams();
  searchParams.get("text");

  const [createMessage] = useCreateMessageMutation();

  return (
    <Formik
      initialValues={{ text: searchParams.get("text") || "" }}
      onSubmit={async ({ text }, { setFieldValue }) => {
        console.log("text", text);
        console.log("conversationId", conversationId);

        if (!conversationId) return;
        await createMessage({
          variables: { conversationId, text },
        });
        setFieldValue("text", "");
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
