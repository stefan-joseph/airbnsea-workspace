import { Divider } from "@mui/material";

export default function OrDivider() {
  return (
    <Divider
      sx={{
        mt: 3,
        mb: 3,
        fontSize: 14,
        span: {
          opacity: 0.4,
        },
      }}
    >
      or
    </Divider>
  );
}
