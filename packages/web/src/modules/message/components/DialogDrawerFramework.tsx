import { Dialog, Drawer } from "@mui/material";
import { borderRadius } from "../../../constants/constants";

export const DialogDrawerFramework = ({
  children,
  mobile,
  open,
  handleClose,
}: {
  children: JSX.Element;
  mobile: boolean;
  open: boolean;
  handleClose: () => void;
}) => {
  if (mobile) {
    return (
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="bottom"
        PaperProps={{
          sx: {
            height: "fit-content",
            minHeight: "40vh",
            justifyContent: "center",
            p: 3,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        {children}
      </Drawer>
    );
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100vw" }}
      PaperProps={{
        sx: {
          width: "100%",
          p: 4,
          display: "flex",
          gap: 4,
          borderRadius: borderRadius,
        },
      }}
    >
      {children}
    </Dialog>
  );
};
