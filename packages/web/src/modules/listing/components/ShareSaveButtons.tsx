import { Button, Stack } from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export const ShareSaveButtons = () => (
  <Stack direction="row" spacing={2}>
    <Button color="inherit" startIcon={<IosShareRoundedIcon />}>
      Share
    </Button>
    <Button color="inherit" startIcon={<FavoriteBorderOutlinedIcon />}>
      Save
    </Button>
  </Stack>
);
