import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
type Props = {
  tab: string;
  text: string;
  tabOpen: string;
  setTabOpen: (tab: string) => void;
};

export const TabButton = ({ tab, text, tabOpen, setTabOpen }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Button
      key={text}
      onClick={() => setSearchParams({ tab })}
      sx={{
        color: tabOpen === tab ? "initail" : "grey.600",
        fontSize: 14,
        fontWeight: tabOpen === tab ? 600 : 400,
        textDecoration: "none",
        cursor: tabOpen === tab ? "default" : "pointer",
        "&:hover": {
          textDecoration: "none",
          backgroundColor: tabOpen === tab ? "unset" : undefined,
        },
        "&::after": {
          content: '" "',
          position: "absolute",
          bottom: 0,
          borderBottom: "2px solid",
          display: tabOpen === tab ? "initial" : "none",
          width: "81%",
        },
      }}
    >
      {text}
    </Button>
  );
};
