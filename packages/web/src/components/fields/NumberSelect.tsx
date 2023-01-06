import { IconButton, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

type Props = {
  name: string;
  value: number;
  handleRemove: () => void;
  handleAdd: () => void;
  disableRemove: boolean;
  disableAdd: boolean;
};

export const NumberSelect = ({
  name,
  value,
  handleRemove,
  handleAdd,
  disableRemove,
  disableAdd,
}: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
    >
      <Typography
        component="label"
        sx={{ mr: 5, fontWeight: 600, fontSize: 18, textTransform: "none" }}
      >
        {name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={handleRemove}
          disabled={disableRemove}
          sx={{
            border: "1px solid",
            width: 30,
            height: 30,
            "&:hover": {
              border: "1px solid black",
              backgroundColor: "unset",
            },
          }}
        >
          <RemoveRoundedIcon
            sx={{
              "&:hover": {
                color: "black",
              },
            }}
          />
        </IconButton>
        <Typography sx={{ fontSize: 18, p: 1, textAlign: "center", width: 30 }}>
          {value || 0}
        </Typography>
        <IconButton
          onClick={handleAdd}
          disabled={disableAdd}
          sx={{
            border: "1px solid",
            width: 30,
            height: 30,
            "&:hover": {
              border: "1px solid black",
              backgroundColor: "unset",
            },
          }}
        >
          <AddRoundedIcon
            sx={{
              "&:hover": {
                color: "black",
              },
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};
