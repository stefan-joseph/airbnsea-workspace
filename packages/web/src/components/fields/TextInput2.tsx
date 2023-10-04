import { TextField } from "@mui/material";
import { FieldProps } from "formik";
import { ReactNode } from "react";

export const TextInput2: React.FC<
  FieldProps<any> & {
    placeholder: string;
    type: string;
  }
> = ({
  field: { ...field },
  form: { touched, errors, setFieldValue },
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  return (
    <TextField
      {...field}
      {...props}
      // always trim leading and trailing whitespace
      onBlur={() => setFieldValue(field.name, field.value.trim())}
      error={!!errorMsg}
      helperText={errorMsg as ReactNode}
      sx={{ mt: 1.2 }}
      color="info"
      InputProps={{
        sx: {
          borderRadius: 2,
        },
      }}
      InputLabelProps={{
        shrink: true,
        sx: {
          fontSize: 19,
          backgroundColor: "#FFF",
          pr: 0.6,
          color: "rgba(0, 0, 0, 0.67)",
        },
      }}
    />
  );
};
