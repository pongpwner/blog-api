import { Express, NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}
//check if user is authorized for a protected route
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("start auth");
  //gets the token from header
  const authorization = req.headers["authorization"];
  console.log(authorization);
  if (!authorization) throw new Error("You need to login");
  const token = authorization.split(" ")[1];

  //checks if token is legitamate
  verify(token, "secret", (err, authData) => {
    if (err) {
      console.log("error 403");
      res.json({
        message: "something is wrong",
      });
    }
    console.log(authData);
    res.json({
      message: "success",
      authData: authData,
    });
  });
};
