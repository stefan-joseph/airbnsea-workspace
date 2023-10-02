import { useState } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function TransitionAlerts({
  severity,
  text,
}: {
  severity: AlertColor;
  text: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        // action={
        //   <IconButton
        //     aria-label="close"
        //     color="inherit"
        //     size="small"
        //     onClick={() => {
        //       setOpen(false);
        //     }}
        //   >
        //     <CloseIcon fontSize="inherit" />
        //   </IconButton>
        // }
        sx={{ mb: 1 }}
      >
        {text}
      </Alert>
    </Collapse>
  );
}
