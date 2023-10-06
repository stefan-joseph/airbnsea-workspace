import axios from "axios";
import { formatGraphQLYogaError } from "./formatGraphQLYogaError";
import { badGithubOauthRequest } from "../../auth/oauth/errorMessages";
import { Endpoints } from "@octokit/types";

export type Credentials = {
  email?: string;
  firstName?: string;
  avatarImg?: string;
};

export default async function getGithubCredentials(
  code: string
): Promise<Credentials> {
  return await axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_AUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then(async ({ data }) => {
      const accessToken = data.access_token;
      const response: unknown = await axios("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return {
        accessToken,
        response: response as Endpoints["GET /user"]["response"],
      };
    })
    .then(async ({ response, accessToken }) => {
      let { email, name, avatar_url } = response.data;

      let firstName;
      if (name) {
        firstName = name.split(" ")[0];
      }

      const avatarImg = avatar_url;

      if (email) {
        return { email, firstName, avatarImg };
      }
      const response2: unknown = await axios(
        "https://api.github.com/user/emails",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const emails = (response2 as Endpoints["GET /user/emails"]["response"])
        .data;
      email = emails.find((email) => email.primary)?.email || null;
      return { email: email || undefined, firstName, avatarImg };
    })
    .catch((err) => {
      console.log("getGithubCredentialsERROR", err);
      return formatGraphQLYogaError(badGithubOauthRequest);
    });
}
