import { Field, FieldProps } from "formik";
import {
  Avatar,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type Button = { value: string; img: string };

export const VesselType = () => {
  const buttons: Button[] = [
    { value: "sailboat", img: "" },
    { value: "catamaran", img: "" },
  ];
  return (
    <Field
      name="vesselType"
      buttons={buttons}
      component={RadioButtonsWithImg}
    />
  );
};

const RadioButtonsWithImg: React.FC<
  FieldProps<any> & { buttons: Button[] }
> = ({
  field: { onChange, value },
  form: { touched, errors, setFieldValue, handleChange, values },
  buttons,
}) => {
  const commonStyles = {
    marginBottom: 1,
    padding: "10px",
    borderRadius: 2,
    border: 1.5,
    borderColor: "grey.400",
    "&:hover": {
      borderColor: "text.primary",
    },
  };

  const Image = (img: string) => (
    <Avatar src={img} variant="rounded" sx={{ marginLeft: "auto" }} />
  );

  return (
    <RadioGroup
      name="vesselType"
      onChange={handleChange}
      sx={{ width: "100%" }}
    >
      {buttons.map(({ value, img }) => (
        <FormControlLabel
          key={value}
          value={value}
          labelPlacement="start"
          label={value.charAt(0).toUpperCase() + value.slice(1)}
          sx={
            values.vesselType === value
              ? {
                  ...commonStyles,
                  borderColor: "primary.text",
                  backgroundColor: "grey.50",
                }
              : { ...commonStyles }
          }
          control={
            <Radio
              icon={Image(img)}
              checkedIcon={Image(img)}
              disableRipple
              color="default"
              sx={{
                "&:hover": {
                  bgcolor: "transparent",
                },
                width: "100%",
                padding: 0,
              }}
            />
          }
        />
      ))}
    </RadioGroup>
  );
};
