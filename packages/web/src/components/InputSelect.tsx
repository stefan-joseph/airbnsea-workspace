import { FieldProps } from "formik";
import { Form, Select } from "antd";
import { ReactNode } from "react";

export const InputSelect: React.FC<
  FieldProps<any> & {
    placeholder: string;
    // prefix: ReactNode;
    // inputType: string | undefined;
    // type: string;
    options: string[] | undefined;
    mode: string;
  }
> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue },
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  const { Option } = Select;

  const children: React.ReactNode[] = [];
  props.options?.forEach((option) => {
    children.push(
      <Option key={option} value={option} name="amenities">
        {option}
      </Option>
    );
  });

  // remove unneeded prop before spread into component and save value
  // const inputType = props.inputType;
  // delete props.inputType;
  // props.options = undefined;

  return (
    <Form.Item
      name={field.name}
      help={errorMsg as ReactNode}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <Select
        {...field}
        // {...props}
        mode="multiple"
        placeholder={props.placeholder}
        onChange={(value: string[]) => setFieldValue(field.name, value)}
      >
        {children}
      </Select>
    </Form.Item>
  );
};
