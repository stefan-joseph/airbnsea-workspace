import { Button, SvgIcon } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";

export default function TestUserButton({
  handleClick,
}: {
  handleClick: () => any;
}) {
  const setUserAndRedirect = useSetUserAndRedirect();
  return (
    <Button
      variant="outlined"
      fullWidth
      size="large"
      onClick={async () => {
        const { data } = await handleClick();
        if (data?.loginAsRandomUser) {
          setUserAndRedirect();
        }
      }}
      startIcon={
        <SvgIcon sx={{ mr: 1 }}>
          <FaUserCircle color="#431407" />
        </SvgIcon>
      }
      sx={{
        backgroundColor: "#fff7ed",
        borderColor: "rgb(215 223 233)",
        "&:hover": {
          backgroundColor: "#ffedda",
          borderColor: "rgb(215 223 233)",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        },
      }}
    >
      Continue as Test User
    </Button>
  );
}
