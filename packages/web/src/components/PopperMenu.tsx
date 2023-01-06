import { Box, ClickAwayListener, Grow, Paper, Popper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { boolean } from "yup";

type Props = {
  children: JSX.Element;
  open: boolean;
  anchorEl: React.MutableRefObject<any>;
  handleClose?: (e: any) => void;
  width?: number | string | null;
  marginTop?: number | string;
};

export const PopperMenu = ({
  children,
  open,
  handleClose,
  anchorEl,
  width,
  marginTop,
}: Props) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl.current}
      role={undefined}
      placement="bottom-end"
      transition
      disablePortal
      sx={{
        zIndex: 10,
        position: "absolute",
      }}
      modifiers={[
        {
          name: "flip",
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
        >
          <Paper
            elevation={4}
            sx={{
              borderRadius: 3,
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
