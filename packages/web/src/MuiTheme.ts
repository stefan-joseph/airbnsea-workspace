import { createTheme } from "@mui/material/styles";
import { mainBlackColor } from "./constants/constants";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0891b2",
      dark: "#0e7490",
    },
    secondary: {
      main: mainBlackColor,
    },
    info: { main: "#222222" },
    error: { main: "#C13515" },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    fontFamily: "Mori",
    allVariants: {
      color: mainBlackColor,
    },
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "Mori",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "info",
        size: "large",
        disableElevation: true,
      },
      styleOverrides: {
        text: {
          height: 48,
          textTransform: "none",
          fontWeight: 700,
          textDecoration: "underline",
          borderRadius: 6,
          padding: 10,
          fontSize: 16,
          "&:hover": {
            textDecoration: "underline",
          },
        },
        contained: {
          height: 48,
          textTransform: "none",
          fontSize: 16,
          borderRadius: 8,
          letterSpacing: 0.5,
          fontWeight: 500,
          padding: "0 1rem",
          "&:disabled": {
            color: "#FFF",
          },
        },
        outlined: {
          height: 48,
          textTransform: "none",
          borderRadius: 8,
          borderWidth: "1px",
          padding: "0 1rem",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            cursor: "default",
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          justifyContent: "center",
        },
        labelContainer: {
          fontWeight: 600,
          marginRight: "unset",
          marginLeft: 14,
          cursor: "default",
        },
      },
    },
  },
});
