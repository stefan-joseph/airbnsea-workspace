import { Button } from "@mui/material";
import { FaGithub } from "react-icons/fa";

export default function OauthLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <Button
      variant="outlined"
      size="large"
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const state = crypto.randomUUID();

        localStorage.setItem("latestCSRFToken", state);

        let link = href;
        link += `?client_id=${process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID}`;
        link += `&scope=user:email`;
        link += `&state=${state}`;

        window.location.href = link;
      }}
      startIcon={<FaGithub style={{ marginRight: 6 }} />}
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
      {name}
    </Button>
  );
}
