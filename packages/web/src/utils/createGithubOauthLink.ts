import getGithubClientId from "./getGithubClientId";

export default function createGithubOauthLink(href: string, state: string) {
  let link = href;
  link += `?client_id=${getGithubClientId()}`;
  link += `&scope=user:email`;
  link += `&state=${state}`;
  return link;
}
