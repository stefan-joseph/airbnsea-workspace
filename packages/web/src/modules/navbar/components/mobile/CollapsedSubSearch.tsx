import { Paper, Stack, Typography } from "@mui/material";

type Props = {
  value: any;
  text: string;
  handleClick: any;
};

export const CollapsedSubSearch = ({ value, text, handleClick }: Props) => {
  return (
    <Paper
      onClick={handleClick}
      sx={{ p: 2, borderRadius: 4, cursor: "pointer" }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography>{text}</Typography>
        <Typography fontWeight={700} fontSize={14}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
};
