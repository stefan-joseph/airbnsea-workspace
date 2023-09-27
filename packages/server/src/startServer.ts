import "dotenv/config";
import { createServer, createPubSub } from "@graphql-yoga/node";
import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
import Redis from "ioredis";

// import { runSeeders } from "typeorm-extension";
// import rateLimit from "express-rate-limit";
// import RateLimitRedisStore from "rate-limit-redis";
// import passport = require("passport");
// import { Strategy } from "passport-facebook";
import cloudinary = require("cloudinary");
import express = require("express");
import { applyMiddleware } from "graphql-middleware";
const cors = require("cors");
import expressSession = require("express-session");
const RedisStore = require("connect-redis")(expressSession);

// import { confirmEmail } from "./routes/confirmEmail";
import { redisSessionPrefix } from "./utils/constants";
import { redis } from "./redis";
import { generateModularSchema } from "./utils/generateModularSchema";
import { authMiddleware, listingIdMiddleware } from "./middleware/middleware";
import { userLoader } from "./loaders/userLoader";
import { getTypeormConnection } from "./utils/getTypeormConnection";
import { ConversationMessage, InboxMessage } from "./types/types";
import { githubOauth } from "./routes/auth/githubOauth";

export const startServer = async () => {
  const app = express();

  app.use(
    expressSession({
      store: new RedisStore({ client: redis, prefix: redisSessionPrefix }),
      name: "qid",
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      },
    })
  );

  const schema = generateModularSchema();
  const schemaWithMiddleware = applyMiddleware(
    schema,
    authMiddleware,
    listingIdMiddleware
  );

  const publishClient =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? new Redis()
      : new Redis(process.env.REDIS_URL as string, {
          family: 6,
        });
  const subscribeClient =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? new Redis()
      : new Redis(process.env.REDIS_URL as string, {
          family: 6,
        });

  const eventTarget = createRedisEventTarget({
    publishClient,
    subscribeClient,
  });

  const pubSub = createPubSub<{
    newMessage: [payload: ConversationMessage];
    newInboxUpdate: [payload: InboxMessage];
  }>({ eventTarget });

  await getTypeormConnection().initialize();
  // .then(async () => {
  //   await getTypeormConnection().synchronize(true);
  //   await runSeeders(getTypeormConnection());
  // });

  // clear cache
  // await redis.del(listingCacheKey);

  // fill cache
  // const listings = await Listing.find();
  // const listingStrings = listings.map((listing) => JSON.stringify(listing));
  // await redis.lpush(listingCacheKey, ...listingStrings);

  const yoga = createServer({
    schema: schemaWithMiddleware,
    context: ({ request }) => ({
      redis,
      url: request.url,
      userLoader: userLoader(),
      pubSub,
    }),
  });
  app.use("/graphql", yoga);

  const corsOptions = {
    credentials: true,
    // origin:
    //   process.env.NODE_ENV === "test"
    //     ? "*"
    //     :process.env.FRONTEND_HOST
    origin: "*",
  };
  app.use(cors(corsOptions));

  // const limiter = rateLimit({
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  //   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  //   store: new RateLimitRedisStore({
  //     //@ts-ignore
  //     sendCommand: (...args: string[]) => redis.call(...args),
  //   }),
  // });
  // app.use(limiter);

  // passport.use(
  //   new Strategy(
  //     {
  //       clientID: process.env.FACEBOOK_APP_ID as string,
  //       clientSecret: process.env.FACEBOOK_APP_SECRET as string,
  //       callbackURL: "http://localhost:4000/auth/facebook/callback",
  //     },
  //     async (_, __, profile, cb) => {
  //       console.log(profile);
  //       const { id, emails } = profile;

  //       const query = connection
  //         .getRepository(User)
  //         .createQueryBuilder("user")
  //         .where('"user"."facebookId" = :id', { id });

  //       let email: string | null = null;

  //       if (emails) {
  //         email = emails[0].value;
  //         query?.orWhere("user.email = :email", { email });
  //       }

  //       let user = await query.getOne();

  //       // registers user if need be
  //       if (!user) {
  //         user = await User.create({
  //           facebookId: id,
  //           email: email,
  //         }).save();
  //       } else if (!user.facebookId) {
  //         // if reached, we have found user by email
  //         // merge existing account with facebook login
  //         user.facebookId = id;
  //         await user.save();
  //       } else {
  //         // we have a twitterId and email
  //         // proceed to login
  //       }

  //       return cb(null, { id: user.id });
  //     }
  //   )
  // );

  // app.use(passport.initialize());

  // app.get("/auth/facebook", passport.authenticate("facebook"));

  // app.get(
  //   "/auth/facebook/callback",
  //   passport.authenticate("facebook", { session: false }),
  //   (req: any, res: any) => {
  //     req.session.userId = req.user.id;
  //     // @todo redirect to frontend
  //     res.redirect("/graphql");
  //   }
  // );

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.set("trust proxy", 1);
  // app.use("/images", express.static("images"));
  // app.get("/confirm-email/:id", confirmEmail);

  app.get("/auth/github", (_, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_AUTH_CLIENT_ID}&scope=user:email`
    );
  });

  app.get("/auth/github/callback", githubOauth);

  // app.get("/auth/github/callback", (req, _) => {
  //   axios
  //     .post(
  //       "https://github.com/login/oauth/access_token",
  //       {
  //         client_id: process.env.GITHUB_AUTH_CLIENT_ID,
  //         client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
  //         code: req.query.code,
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((result) => {
  //       console.log("result", result);
  //       console.log("result.data.access_token", result.data.access_token);
  //       // res.send("you are authorized " + result.data.access_token)
  //       axios("https://api.github.com/user", {
  //         headers: { Authorization: `Bearer ${result.data.access_token}` },
  //       })
  //         .then((result) => {
  //           console.log("1st api call result", result.data);
  //         })
  //         .catch((err) => console.log(err));
  //       axios("https://api.github.com/user/emails", {
  //         headers: { Authorization: `Bearer ${result.data.access_token}` },
  //       })
  //         .then((result) => {
  //           console.log("2nd api call result", result.data);
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  app.get("/", (_, res) => res.redirect("/graphql"));

  const port = 8080;
  console.log(`running app on port ${port}`);

  await app.listen(port);
};
