import { Field, FieldProps } from "formik";
import { TextInput } from "../../../../components/fields/TextInput";

export const Name = () => {
  return <Field name="name" label="Title of Listing" component={TextInput} />;
};
