import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  value: string | number | null;
  placeholder?: string;
  label: string;
  isPlaceholder: boolean;
  inputField?: ReactNode;
};

export const ExpandedSubSearch = ({
  children,
  value,
  placeholder,
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
        <Typography component="label" noWrap fontSize={13} fontWeight={600}>
          {label}
        </Typography>
        {inputField ? (
          inputField
        ) : (
          <Typography
            noWrap
            fontSize={14}
            fontWeight={value ? 600 : 400}
            color={isPlaceholder ? "inherit" : "grey.500"}
            padding="4px 4px 4px 0"
          >
            {value || placeholder}
          </Typography>
        )}
      </Stack>
      {children}
    </Stack>
  );
};
