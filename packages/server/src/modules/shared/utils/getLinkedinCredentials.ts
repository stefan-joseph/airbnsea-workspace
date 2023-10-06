import axios from "axios";
import { stringify } from "querystring";
import { badLinkedinOauthRequest } from "../../auth/oauth/errorMessages";
import { formatGraphQLYogaError } from "./formatGraphQLYogaError";
import { Credentials } from "./getGithubCredentials";

export default async function getLinkedinCredentials(
  code: string
): Promise<Credentials> {
  return await axios
    .post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      stringify({
        grant_type: "authorization_code",
        code,
        client_id: process.env.LINKEDIN_AUTH_CLIENT_ID,
        client_secret: process.env.LINKEDIN_AUTH_CLIENT_SECRET,
        redirect_uri: `${process.env.FRONTEND_HOST}/auth/linkedin`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(async ({ data }) => {
      const accessToken = data.access_token;
      return await axios("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    })
    .then(({ data }) => {
      const { email, email_verified, given_name, picture } = data;
      return {
        email: email && email_verified ? email : undefined,
        firstName: given_name,
        avatarImg: picture,
      };
    })
    .catch((err) => {
      console.log("getLinkedinCredentialsERROR", err);
      return formatGraphQLYogaError(badLinkedinOauthRequest);
    });
}
