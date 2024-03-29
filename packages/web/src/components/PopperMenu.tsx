import {
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  PopperPlacementType,
} from "@mui/material";

import { borderRadius } from "../constants/constants";

type Props = {
  children: JSX.Element;
  open: boolean;
  anchorEl: React.MutableRefObject<any>;
  handleClose?: (e: any) => void;
  placement?: PopperPlacementType;
  width?: number | string | null;
  padding?: number | string;
  marginTop?: number | string;
  disableAnimation?: boolean;
  elevation?: number;
  boxShadow?: string;
};

export const PopperMenu = ({
  children,
  open,
  anchorEl,
  handleClose,
  placement,
  width,
  padding,
  marginTop,
  disableAnimation,
  elevation,
  boxShadow,
}: Props) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl.current}
      role={undefined}
      placement={placement || "bottom-end"}
      transition
      disablePortal
      // prevent parent component from firing because we have disabled portal
      // this prevents from clickAwayListener from firing first try on booking calendar close attempt
      // onClick={(e) => e.stopPropagation()}
      sx={{
        zIndex: 999,
        position: "absolute",
        cursor: "default",
      }}
      modifiers={[
        {
          name: "flip",
          enabled: false,
        },
        {
          name: "preventOverflow",
          enabled: false,
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: "right top",
          }}
          timeout={disableAnimation ? 0 : undefined}
        >
          <Paper
            elevation={elevation || 4}
            sx={{
              borderRadius,
              overflow: "hidden",
              p: padding,
              marginTop: marginTop,
              width: width || "100%",
              boxShadow,
            }}
          >
            <ClickAwayListener
              onClickAway={(e) => handleClose && handleClose(e)}
            >
              <Box>{children}</Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
