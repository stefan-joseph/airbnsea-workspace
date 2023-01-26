import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  children?: JSX.Element | JSX.Element[];
  value: any;
  text: string;
  subtitle?: string;
  handleClick: any;
  selected?: boolean;
};

export const CollapsedSubSearch = ({
  children,
  value,
  text,
  subtitle,
  handleClick,
  selected,
}: Props) => {
  return (
    <Paper
      onClick={handleClick}
      elevation={selected ? 5 : 2}
      sx={{
        p: selected ? 0 : 2,
        borderRadius: 4,
        cursor: selected ? "default" : "pointer",
        mb: 1.4,
      }}
    >
      {selected ? (
        <>
          <Typography
            fontSize={20}
            fontWeight={700}
            paddingTop={2}
            paddingLeft={2}
          >
            {subtitle}
          </Typography>
          {children}
        </>
      ) : (
        <Stack direction="row" justifyContent="space-between">
          <Typography>{text}</Typography>
          <Typography fontWeight={700} fontSize={14}>
            {value}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};
