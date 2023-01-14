"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
//check if user is authorized for a protected route
const isAuth = (req, res, next) => {
    console.log("start auth");
    //gets the token from header
    const authorization = req.headers["authorization"];
    console.log(authorization);
    if (!authorization)
        throw new Error("You need to login");
    const token = authorization.split(" ")[1];
    //checks if token is legitamate
    (0, jsonwebtoken_1.verify)(token, "secret", (err, authData) => {
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
exports.isAuth = isAuth;
