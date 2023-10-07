import getGithubClientId from "./getGithubClientId";

export default function createGithubOauthLink(href: string, state: string) {
  let link = href;
  link += `?client_id=${getGithubClientId()}`;
  link += `&redirect_uri=${window.location.origin}/auth/github`;
  link += `&scope=user:email`;
  link += `&state=${state}`;
  return link;
}
