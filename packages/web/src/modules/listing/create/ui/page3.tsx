import { Field } from "formik";
import { InputField } from "../../../../components/InputField";
import { InputSelect } from "../../../../components/InputSelect";
import { Form, Select } from "antd";
import { LocationField } from "../../../../components/LocationField";

export const Page3 = () => {
  const { Option } = Select;

  const options = ["pool", "kitchen"];
  const children: React.ReactNode[] = [];
  options?.forEach((option) => {
    children.push(
      <Option key={option} value={option} name="amenities">
        {option}
      </Option>
    );
  });

  return (
    <>
      <Field name="tmp" component={LocationField} />
      <Field
        name="amenities"
        // inputType="select"
        // mode="multiple"
        options={["pool", "wifi", "netflix", "dishwasher"]}
        placeholder="amenities"
        component={InputSelect}
      />
    </>
  );
};
