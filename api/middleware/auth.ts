import { NextFunction, Request, Response } from "express";
import { UserFields } from "../types";
import { HydratedDocument } from "mongoose";
import User from "../models/User";

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWithUser;
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        res.status(401).send({ error: "No token present" });
        return;
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    const user = await User.findOne({ token });

    if (!user) {
        res.status(401).send({ error: "Wrong token" });
        return;
    }

    req.user = user;

    next();
};

export default auth;
