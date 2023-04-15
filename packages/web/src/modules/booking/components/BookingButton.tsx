import { Button, CircularProgress } from "@mui/material";
import { useMeQuery } from "@airbnb-clone/controller";
import { Field, FieldProps } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

export const BookingButton = ({
  handleClick,
  setCalendarOpen,
  fullWidth,
}: {
  handleClick: () => void;
  setCalendarOpen: (value: boolean) => void;
  fullWidth?: boolean;
}) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { data, loading, error } = useMeQuery();

  return (
    <Field>
      {({ form: { values, isValid, isSubmitting } }: FieldProps) => (
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type={isValid || !error ? "submit" : undefined}
          onClick={async () => {
            if (!values.start || !values.end || !isValid) {
              setCalendarOpen(true);
            } else {
              if (error) {
                navigate("/login", {
                  state: {
                    redirect: location.pathname + location.search,
                    message: "Please log in to make a reservation.",
                  },
                });
              } else if (data) {
                handleClick();
              }
            }
          }}
          fullWidth={fullWidth}
        >
          {loading ? (
            <CircularProgress size={30} sx={{ color: "#FFF" }} />
          ) : !values.start || !values.end ? (
            "Check availability"
          ) : !isValid ? (
            "Change dates"
          ) : (
            "Reserve"
          )}
        </Button>
      )}
    </Field>
  );
};
