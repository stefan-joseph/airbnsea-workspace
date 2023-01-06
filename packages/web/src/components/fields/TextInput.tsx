import { TextField } from "@mui/material";
import { FieldProps } from "formik";

export const TextInput: React.FC<FieldProps<any> & { label: string }> = ({
  field,
  form: { touched, errors, setFieldValue, handleChange, values },
  label,
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      multiline
      {...field}
      {...props}
      fullWidth
      //console warning without this, why?
      value={field.value}
    />
  );
};
