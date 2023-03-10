import { Button, CircularProgress } from "@mui/material";
import { Field, FieldProps } from "formik";

export const BookingButton = ({
  setCalendarOpen,
  fullWidth,
}: {
  setCalendarOpen: (value: boolean) => void;
  fullWidth?: boolean;
}) => {
  return (
    <Field>
      {({ form: { values, isValid, isSubmitting } }: FieldProps) => (
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type={isValid ? "submit" : undefined}
          onClick={() => {
            if (values.start && values.end) return;
            setCalendarOpen(true);
          }}
          fullWidth={fullWidth}
        >
          {isSubmitting ? (
            <CircularProgress size={30} sx={{ color: "#FFF" }} />
          ) : values.start && values.end ? (
            "Reserve"
          ) : (
            "Check availability"
          )}
        </Button>
      )}
    </Field>
  );
};
