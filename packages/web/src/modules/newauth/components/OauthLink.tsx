import { Button, SvgIcon } from "@mui/material";
import { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";

export default function OauthLink({
  href,
  text,
  Icon,
  handleClick,
}: {
  href: string;
  text: string;
  Icon: JSX.Element;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) {
  return (
    <Button
      component="a"
      variant="outlined"
      fullWidth
      size="large"
      href={href}
      onClick={handleClick}
      startIcon={<SvgIcon sx={{ mr: 1 }}>{Icon}</SvgIcon>}
      sx={{
        backgroundColor: "rgb(248 249 252)",
        borderColor: "rgb(215 223 233)",
        "&:hover": {
          backgroundColor: "rgb(241 242 249)",
          borderColor: "rgb(215 223 233)",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        },
      }}
    >
      {text}
    </Button>
  );
}
