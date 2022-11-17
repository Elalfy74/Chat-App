import config from "config";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access deniend , No Token");
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = verify(token, config.get("jsonWebToken")) as {
      userId: string;
      userName: string;
    };
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
  if (!decodedToken) {
    return res.status(400).send("Invalid Token");
  }

  req.userId = decodedToken.userId;
  next();
};
