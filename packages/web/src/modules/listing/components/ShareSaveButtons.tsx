import { Button, IconButton, Stack } from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export const ShareSaveButtons = ({
  onlyIcon,
  spacing,
}: {
  onlyIcon?: boolean;
  spacing?: number;
}) => {
  const buttons = [
    {
      text: "Share",
      icon: <IosShareRoundedIcon fontSize="small" />,
    },
    { text: "Save", icon: <FavoriteBorderOutlinedIcon fontSize="small" /> },
  ];

  return (
    <Stack direction="row" spacing={spacing || 2}>
      {buttons.map(({ text, icon }) => {
        if (onlyIcon) {
          return (
            <IconButton key={text} color="info">
              {icon}
            </IconButton>
          );
        }
        return (
          <Button
            key={text}
            color="info"
            startIcon={icon}
            sx={{ fontSize: 14 }}
          >
            {text}
          </Button>
        );
      })}
    </Stack>
  );
};
