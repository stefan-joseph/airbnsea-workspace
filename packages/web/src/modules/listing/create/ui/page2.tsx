import { Field } from "formik";
import { InputField } from "../../../../components/InputField";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
export const Page2 = () => {
  return (
    <>
      <Field
        name="price"
        inputType="number"
        type="number"
        placeholder="price per night"
        prefix={<span style={{ color: "rgba(0,0,0,.55" }}>$</span>}
        addonAfter="/ night"
        component={InputField}
      />
      <Field
        name="beds"
        inputType="number"
        type="number"
        placeholder="Number of beds"
        addonAfter="beds"
        component={InputField}
      />
      <Field
        name="guests"
        inputType="number"
        type="number"
        placeholder="Number of guests"
        prefix={<UsergroupAddOutlined style={{ color: "rgba(0,0,0,.55" }} />}
        addonAfter="max guests"
        component={InputField}
      />
    </>
  );
};
