import { Button, SvgIcon } from "@mui/material";

export default function OauthLink({
  href,
  text,
  Icon,
  getLink,
}: {
  href: string;
  text: string;
  Icon: JSX.Element;
  getLink: (href: string, state: string) => string;
}) {
  return (
    <Button
      component="a"
      variant="outlined"
      fullWidth
      size="large"
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const state = crypto.randomUUID();
        localStorage.setItem("latestCSRFToken", state);
        const link = getLink((e.target as HTMLAnchorElement).href, state);
        window.location.href = link;
      }}
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
