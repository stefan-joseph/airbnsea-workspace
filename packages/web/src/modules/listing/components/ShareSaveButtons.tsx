import { Button, IconButton, Stack } from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IoShareOutline, IoHeartOutline } from "react-icons/io5";

export const ShareSaveButtons = ({
  notVisible,
  onlyIcon,
  spacing,
}: {
  notVisible?: boolean;
  onlyIcon?: boolean;
  spacing?: number;
}) => {
  const buttons = [
    {
      text: "Share",
      icon: <IoShareOutline size={18} />,
    },
    { text: "Save", icon: <IoHeartOutline size={18} /> },
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
            sx={{ fontSize: 13, opacity: notVisible ? 0 : 1 }}
          >
            {text}
          </Button>
        );
      })}
    </Stack>
  );
};
