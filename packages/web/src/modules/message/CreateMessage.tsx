import { useCreateMessageMutation } from "@airbnb-clone/controller";
import { Button } from "antd";
import { Field, Formik, Form } from "formik";
import { InputField } from "../../components/InputField";

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
          <Field name="text" component={InputField} />
          <Button htmlType="submit">Send</Button>
        </Form>
      )}
    </Formik>
  );
};
