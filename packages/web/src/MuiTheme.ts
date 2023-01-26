import { ThemeProvider, createTheme } from "@mui/material/styles";
import { mainBlackColor } from "./constants/constants";

export const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#0277bd",
      // main: "#01579b",
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
          fontSize: 18,
          borderRadius: 8,
          "&:disabled": {
            color: "#FFF",
          },
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
