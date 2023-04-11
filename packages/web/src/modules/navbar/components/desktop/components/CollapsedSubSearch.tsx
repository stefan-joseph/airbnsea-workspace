import { Stack, Typography } from "@mui/material";

type Props = {
  text: string;
  children?: JSX.Element;
  justifyContent?: string;
};

export const CollapsedSubSearch = ({
  text,
  children,
  justifyContent,
}: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent={justifyContent || "center"}
      alignItems="center"
      flex={1}
      width="30%"
      height="100%"
    >
      <Typography
        fontSize={14}
        fontWeight={600}
        paddingLeft={1}
        paddingRight={1}
        noWrap
        textOverflow="ellipsis"
      >
        {text}
      </Typography>
      {children}
    </Stack>
  );
};
