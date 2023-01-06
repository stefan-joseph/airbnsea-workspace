import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { client } from "./apollo";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AppProvider } from "./context/context";
import { UserIdentifier } from "./components/UserIndentifier";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#0277bd",
      // main: "#01579b",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
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
      color: "#222222",
    },
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        sx: { textTransform: "none" },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          justifyContent: "center",
        },
        labelContainer: {
          marginRight: "unset",
          marginLeft: 14,
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <AppProvider>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <UserIdentifier>
          <RouterProvider router={router} />
        </UserIdentifier>
      </ThemeProvider>
    </ApolloProvider>
  </AppProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
