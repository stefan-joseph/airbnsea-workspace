import { FormikHelpers } from "formik";
import { NumberSelect } from "./fields/NumberSelect";

export const GuestsSelect = ({
  value,
  setFieldValue,
}: {
  value: any;
  setFieldValue: FormikHelpers<any>["setFieldValue"];
}) => {
  return (
    <NumberSelect
      name="Guests"
      value={value}
      handleRemove={() => {
        if (value > 1) {
          setFieldValue("guests", +value - 1);
        } else {
          setFieldValue("guests", null);
        }
      }}
      handleAdd={() => {
        if (value < 16) {
          setFieldValue("guests", +value + 1);
        } else if (!value) {
          setFieldValue("guests", 1);
        }
      }}
      disableRemove={value <= 0 || !value}
      disableAdd={value >= 16}
    />
  );
};
