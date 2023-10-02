import { Button } from "@mui/material";
import { Loader } from "./Loader";

export default function LaodingButton({
  text,
  loading,
}: {
  text: string;
  loading: boolean;
}) {
  return (
    <Button
      disabled={loading}
      variant="contained"
      type="submit"
      color="primary"
    >
      {!loading ? text : <Loader color="inherit" size={24} />}
    </Button>
  );
}
