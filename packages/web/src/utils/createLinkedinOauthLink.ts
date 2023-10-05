export default function createLinkedinOauthLink(href: string, state: string) {
  let link = href;
  link += "?response_type=code";
  link += `&client_id=${process.env.REACT_APP_LINKEDIN_AUTH_CLIENT_ID}`;
  link += `&redirect_uri=${window.location.origin}/auth/linkedin`;
  link += `&state=${state}`;
  link += "&scope=openid profile email";
  return link;
}
