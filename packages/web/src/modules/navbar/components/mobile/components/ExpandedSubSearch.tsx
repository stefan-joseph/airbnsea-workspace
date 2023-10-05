import { Paper, Typography } from "@mui/material";

export const ExpandedSubSearch = ({
  children,
  text,
}: {
  children: JSX.Element | JSX.Element[];
  text: string;
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: "fixed",
        left: 0,
        right: 0,
        top: 60,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontSize={22} fontWeight={700} padding={3} paddingBottom={1}>
        {text}
      </Typography>
      {children}
    </Paper>
  );
};
