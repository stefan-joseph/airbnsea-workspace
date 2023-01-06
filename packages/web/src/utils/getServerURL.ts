export const getServerUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_SERVER_URL_DEV;
  } else if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_SERVER_URL_PROD;
  } else {
    return process.env.REACT_APP_SERVER_URL_DEV;
  }
};
