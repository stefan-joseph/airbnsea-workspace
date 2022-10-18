import "dotenv/config";
import { createServer } from "@graphql-yoga/node";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import { redis } from "./redis";
// import { confirmEmail } from "./routes/confirmEmail";
import { redisSessionPrefix } from "./utils/constants";
// import rateLimit from "express-rate-limit";
// import RateLimitRedisStore from "rate-limit-redis";
// import passport = require("passport");
// import { Strategy } from "passport-facebook";
// import { User } from "./entity/User";
import express = require("express");
import { generateModularSchema } from "./utils/generateModularSchema";
import { applyMiddleware } from "graphql-middleware";
import { middleware } from "./middleware";
import { userLoader } from "./loaders/userLoader";
// import { WebSocketServer } from "ws";
// const cors = require("cors");
const expressSession = require("express-session");
const RedisStore = require("connect-redis")(expressSession);
// import { createPubSub } from "@graphql-yoga/common";
// import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";

const SESSION_SECRET = "mdsnkjavnasdjv";

export const startServer = async () => {
  const session = expressSession({
    store: new RedisStore({ client: redis, prefix: redisSessionPrefix }),
    name: "qid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  });

  const schema = generateModularSchema();
  const schemaWithMiddleware = applyMiddleware(schema, middleware);

  const pubSub = new RedisPubSub();

  // const publishClient = redis;
  // const subscribeClient = redis;

  // const eventTarget = createRedisEventTarget({
  //   publishClient,
  //   subscribeClient,
  // });

  // const pubSub = createPubSub({ eventTarget });

  await createTypeormConnection();

  const yoga = createServer({
    schema: schemaWithMiddleware,
    context: ({ request }) => ({
      redis,
      url: request.url,
      userLoader: userLoader(),
      pubSub,
      session,
    }),
    // graphiql: {
    //   subscriptionsProtocol: "WS",
    // },
  });
  // app.use("/graphql", yoga);
  await yoga.start();

  // const wsServer = new WebSocketServer({
  //   server: yogaServer,
  //   path: yoga.getAddressInfo().endpoint,
  // });

  // console.log(wsServer);

  // const corsOptions = {
  //   credentials: true,
  //   origin: process.env.NODE_ENV === "test" ? "*" : process.env.FRONTEND_HOST,
  // };
  // app.use(cors(corsOptions));

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
  const app = express();
  app.use("/images", express.static("images"));

  // app.get("/confirm-email/:id", confirmEmail);

  // const port = process.env.PORT || 4000;
  await app.listen(4001);
};
