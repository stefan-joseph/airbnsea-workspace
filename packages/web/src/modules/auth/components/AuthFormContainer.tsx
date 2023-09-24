import { Stack, Typography } from "@mui/material";
import { Form } from "formik";

export default function AuthFormContainer({
  children,
  title,
  subtitle,
}: {
  children: JSX.Element[];
  title: string;
  subtitle?: string;
}) {
  return (
    <Form>
      <Stack
        sx={{
          maxWidth: "24rem",
        }}
        spacing={3}
      >
        <Typography component="h2" variant="h4" gutterBottom>
          {title}
        </Typography>
        {subtitle && <Typography sx={{ opacity: 0.7 }}>{subtitle}</Typography>}
        {children}
      </Stack>
    </Form>
  );
}
