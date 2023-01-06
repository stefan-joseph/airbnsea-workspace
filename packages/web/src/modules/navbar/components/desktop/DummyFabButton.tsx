import { Fab, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { NavbarContext } from "../../Navbar";

type Props = {
  children: JSX.Element;
  active: boolean;
  handleClick?: () => void;
  handleMouseOver: (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  handleMouseLeave: () => void;
  searchButtonRef?: React.RefObject<HTMLButtonElement>;
};

export const DummyFabButton = ({
  children,
  active,
  handleClick,
  handleMouseOver,
  handleMouseLeave,
  searchButtonRef,
}: Props) => {
  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  const [preventHover, setPreventHover] = useState(false);

  return (
    <Fab
      component="span"
      variant="extended"
      disableRipple
      onClick={handleClick}
      onMouseOver={(e) => {
        handleMouseOver(e);
        if (searchButtonRef?.current?.contains(e?.target as HTMLElement)) {
          setPreventHover(true);
        } else setPreventHover(false);
      }}
      onMouseLeave={handleMouseLeave}
      sx={{
        borderRadius: 8,
        width: "100%",
        justifyContent: "space-between",
        height: 64,
        p: 3,
        pr: "4px",
        zIndex: active ? 2 : 1,
        backgroundColor: active || subSearch === null ? "#FFF" : "grey.100",
        boxShadow: active ? "default" : "none",
        transition: "opacity 5000ms linear 0",
        "&:hover": {
          backgroundColor: active
            ? "#FFF"
            : preventHover
            ? "grey.100"
            : "grey.200",
        },
      }}
    >
      {children}
    </Fab>
  );
};
