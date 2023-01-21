"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const session = require("express-session");
const bcrypt = require("bcrypt");
const passport_1 = __importDefault(require("passport"));
const LocalStrategy = require("passport-local").Strategy;
const User_1 = require("./models/User");
passport_1.default.serializeUser((user, done) => {
    return done(null, user.id);
});
//current problem is this is not being called
passport_1.default.deserializeUser((id, done) => {
    User_1.User.findById(id, function (err, user) {
        if (err) {
            return done(err);
        }
        //assigns user to req.user
        done(null, user);
    });
});
// passprt.authenticate calls this callback
//done calls serializeUser
passport_1.default.use(new LocalStrategy(function verify(username, password, done) {
    console.log("verify");
    User_1.User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                // passwords match! log user in
                console.log("user log in from verify");
                return done(null, user);
            }
            else {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" });
            }
        });
    });
}));
