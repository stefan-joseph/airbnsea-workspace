import { FieldProps } from "formik";
import { Form, Input, InputNumber, Select } from "antd";
import { ReactNode } from "react";

export const InputField: React.FC<
  FieldProps<any> & {
    placeholder: string;
    prefix: ReactNode;
    inputType: string | undefined;
    type: string;
  }
> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue },
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  const { Password, TextArea } = Input;
  const { Option } = Select;

  let InputComponent: any;
  if (props.inputType === "password") InputComponent = Password;
  else if (props.inputType === "number") InputComponent = InputNumber;
  else if (props.inputType === "textarea") InputComponent = TextArea;
  else if (props.inputType === "select") InputComponent = Select;
  else InputComponent = Input;

  // remove unneeded prop before spread into component and save value
  const inputType = props.inputType;
  delete props.inputType;

  return (
    <Form.Item
      name={field.name}
      help={errorMsg as ReactNode}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <InputComponent
        {...field}
        {...props}
        onChange={
          inputType === "number"
            ? (value: string) => setFieldValue(field.name, value)
            : onChange
        }
      />
    </Form.Item>
  );
};
