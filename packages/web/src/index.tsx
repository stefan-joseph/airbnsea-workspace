import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

// import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { client } from "./apollo";
import { router } from "./routes/index";
import { AppProvider } from "./context/context";
import { UserIdentifier } from "./components/UserIndentifier";
import { theme } from "./MuiTheme";

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
// reportWebVitals();
