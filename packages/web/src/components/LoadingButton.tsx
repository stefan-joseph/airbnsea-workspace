import { Button, ButtonPropsColorOverrides } from "@mui/material";
import Loader from "./Loader";

export default function LoadingButton({
  text,
  loading,
  color,
}: {
  text: string;
  loading: boolean;
  color?: "info";
}) {
  return (
    <Button
      disabled={loading}
      variant="contained"
      type="submit"
      color={color || "primary"}
    >
      {!loading ? text : <Loader color="inherit" size={24} />}
    </Button>
  );
}
