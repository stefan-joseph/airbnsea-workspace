import { AuthorizationServer, Resolvers } from "../../../types/types";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { User } from "../../../entity/User";
import { userSessionIdPrefix } from "../../../utils/constants";
import { registerOAuthUserSchema } from "@airbnb-clone/common";
import getGithubCredentials from "../../shared/utils/getGithubCredentials";
import getLinkedinCredentials from "../../shared/utils/getLinkedinCredentials";

export const formatNoEmailError = (
  authServer: AuthorizationServer
) => `Cannot access the email associated with your ${authServer} account.
Please use an alternative sign up method 
or check the email settings for your ${authServer} account.`;

export const resolvers: Resolvers = {
  Mutation: {
    authenticateUserWithOauth: async (
      _,
      { code, authServer },
      { req, redis }
    ) => {
      let credentials;

      if (authServer === AuthorizationServer["Linkedin"]) {
        credentials = await getLinkedinCredentials(code);
      } else if (authServer === AuthorizationServer["Github"]) {
        credentials = await getGithubCredentials(code);
      }

      const email = credentials?.email;
      const avatarImg = credentials?.avatarImg;

      if (!email) {
        return formatGraphQLYogaError(formatNoEmailError(authServer));
      }

      const userAlreadyExists = await User.findOne({
        where: { email },
      });

      if (userAlreadyExists) {
        // attempt to log in user in
        const { id, avatar, firstName, password, authorizationServer } =
          userAlreadyExists;

        if (password && !authorizationServer) {
          // if user already has an account with email/password
          // but wants to sign in with oauth
          // need to link oauth to account
          // this could be implemented in 'account settings' after user has already logged in
          // user needs to sign in with password first
          return { __typename: "UserAlreadyExists", email, firstName, avatar };
        }

        if (authorizationServer !== authServer) {
          // user is trying to sign in with wrong auth server
          // redirect to correct authorization server portal
          return {
            __typename: "EmailExistsWithOAuth",
            email,
            firstName,
            avatar,
            authorizationServer: authServer,
          };
        }

        // don't need to check confirmed=true at this point
        // user either originally signed up with oauth
        // or has added oauth authentication in account settings in already confirmed account

        if (!avatar && avatarImg) {
          // update avatar if not on account and provided by authServer
          await User.update({ id }, { avatar: avatarImg });
        }

        // login successful
        req.session.userId = id;
        if (req.sessionID) {
          await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
        }
        return { __typename: "SuccessResponse", success: true };
      }

      // attempt to register user

      let firstName = credentials?.firstName;

      if (!firstName) {
        // @TODO
        // firstName is required for all airbnsea users
        // must redirect user to fill in firstName
        return formatGraphQLYogaError("no name on account");
      }

      // store first name capitalized by default, user can change in account settings if need be
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      // yup validation
      try {
        await registerOAuthUserSchema.validate({ email, firstName });
      } catch (error) {
        // @TODO
        // if firstName error, user redirected to fill in firstName before sign up
        // if email, error, user redirected to default login screen with error explanation
        console.log(error);
        return formatGraphQLYogaError("yup validation error");
      }

      const user = User.create({
        email,
        firstName: firstName.toLowerCase(),
        avatar: avatarImg,
        confirmed: true,
        authorizationServer: authServer,
      });

      const { id } = await user.save();

      // oauth registration and login successful
      req.session.userId = id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${id}`, req.sessionID);
      }
      return { __typename: "SuccessResponse", success: true };
    },
  },
};
