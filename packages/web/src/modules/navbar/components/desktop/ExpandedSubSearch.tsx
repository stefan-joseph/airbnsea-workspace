import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  value: string | number;
  label: string;
  isPlaceholder: boolean;
  inputField?: ReactNode;
};

export const ExpandedSubSearch = ({
  children,
  value,
  label,
  isPlaceholder,
  inputField,
}: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      textTransform="initial"
    >
      <Stack textAlign="left" mt={0.4} sx={{ width: "100%" }}>
        <Typography
          component="label"
          noWrap
          fontSize={12}
          fontWeight={700}
          gutterBottom
        >
          {label}
        </Typography>
        {inputField ? (
          inputField
        ) : (
          <Typography
            noWrap
            fontSize={14}
            color={isPlaceholder ? "inherit" : "grey.500"}
            padding="4px 4px 4px 0"
          >
            {value}
          </Typography>
        )}
      </Stack>
      {children}
    </Stack>
  );
};
