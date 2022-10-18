import { Field } from "formik";

import { InputField } from "../../../../components/InputField";
import { DropzoneField } from "../../../../components/DropzoneField";

export const Page1 = () => {
  return (
    <>
      <Field name="name" placeholder="Listing Title" component={InputField} />
      <Field name="category" placeholder="category" component={InputField} />
      <Field
        name="description"
        inputType="textarea"
        rows={5}
        placeholder="description"
        component={InputField}
      />
      <Field name="img" component={DropzoneField} />
    </>
  );
};
