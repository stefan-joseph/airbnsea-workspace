export default function getGithubClientId() {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID_DEV;
  } else if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID_PROD;
  } else {
    return process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID_DEV;
  }
}
