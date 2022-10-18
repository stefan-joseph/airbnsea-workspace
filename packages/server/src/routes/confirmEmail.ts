// import * as express from 'express'
import { Request, Response } from "express";
import { User } from "../entity/User";
import { redis } from "../redis";

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    await User.update({ id: userId as string }, { confirmed: true });
    await redis.del(id);
    res.send("ok");
    res.redirect(
      ((process.env.NODE_ENV === "development"
        ? process.env.FRONTEND_HOST_DEV
        : process.env.FRONTEND_HOST_PROD) as string) + "/login"
    );
  } else {
    res.send("invalid");
  }
};
