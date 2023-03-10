import { ThemeProvider, createTheme } from "@mui/material/styles";
import { mainBlackColor } from "./constants/constants";

export const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      // main: "#0277bd", // blue
      // main: "#01579b", // dark blue
      // main: "#0f766e", // green
      // main: "#0d9488", // lighter green
      // main: "#0e7490", // cyan
      main: "#0891b2", //lighter cyan
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: mainBlackColor,
    },
    info: { main: "#222222" },
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
          textTransform: "none",
          fontSize: 16,
          borderRadius: 8,
          letterSpacing: 0.1,
          "&:disabled": {
            color: "#FFF",
          },
        },
        outlined: {
          textTransform: "none",
          borderRadius: 8,
          borderWidth: "1px",
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
