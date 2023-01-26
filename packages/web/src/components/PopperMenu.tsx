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
  marginTop?: number | string;
  disableAnimation?: boolean;
};

export const PopperMenu = ({
  children,
  open,
  anchorEl,
  handleClose,
  placement,
  width,
  marginTop,
  disableAnimation,
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
      onClick={(e) => e.stopPropagation()}
      sx={{
        zIndex: 10,
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
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: "right top",
          }}
          timeout={disableAnimation ? 0 : undefined}
        >
          <Paper
            elevation={4}
            sx={{
              borderRadius,
              overflow: "hidden",
              marginTop: marginTop ? marginTop : "unset",
              width: width || "100%",
            }}
          >
            <ClickAwayListener
              onClickAway={(e) => {
                handleClose && handleClose(e);
              }}
            >
              <Box>{children}</Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
