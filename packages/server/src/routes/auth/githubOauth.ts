import axios from "axios";
import { Request, Response } from "express";
import { Endpoints } from "@octokit/types";

export const githubOauth = async (req: Request, _: Response) => {
  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_AUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
      code: req.query.code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  let email;

  const { data: data2 } = await axios("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  console.log("data2", data2);

  email = data2.email;

  // github users email is set to private and needs to be called with more specific endpoint
  if (!email) {
    const { data: data3 } = await axios("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const emails: Endpoints["GET /user/emails"]["response"]["data"] = data3;

    email = emails.find((email) => email.primary)?.email;
  }

  console.log("email", email);

  if (!email) {
    // throw error
    // email is needed as unique identifier for sign up
  }

  if (!data2.name) {
    // throw error
    // name is needed as social identifier to sign up
  }

  // check if user already exists in database
  // if yes, sign in user
  // if no, add new user to database (name, avatarImg, confirmed: true) and sign in user

  // res.redirect(process.env.FRONTEND_HOST as string);
};
