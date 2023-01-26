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
        if (value > 0) {
          setFieldValue("guests", +value - 1);
        }
      }}
      handleAdd={() => {
        if (value < 16) {
          setFieldValue("guests", +value + 1);
        }
      }}
      disableRemove={value <= 0}
      disableAdd={value >= 16}
    />
  );
};
