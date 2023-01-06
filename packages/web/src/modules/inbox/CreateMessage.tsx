import { useCreateMessageMutation } from "@airbnb-clone/controller";
import { Button } from "@mui/material";
import { Field, Formik, Form } from "formik";

import { TextInput2 } from "../../components/fields/TextInput2";

interface Props {
  listingId: string;
}

export const CreateMessage = ({ listingId }: Props) => {
  const [createMessageMutation] = useCreateMessageMutation();

  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async ({ text }, { resetForm }) => {
        await createMessageMutation({
          variables: { message: { text, listingId } },
        });
        // not working ??
        resetForm();
        console.log("reset");
      }}
    >
      {() => (
        <Form>
          <Field name="text" component={TextInput2} />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};
