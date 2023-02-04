"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose = require("mongoose");
const posts_1 = __importDefault(require("./routes/posts"));
const sign_in_1 = __importDefault(require("./routes/sign-in"));
const sign_up_1 = __importDefault(require("./routes/sign-up"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const passport_1 = __importDefault(require("passport"));
var cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
var JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;
const User_1 = require("./models/User");
require("dotenv").config();
console.log(process.env.DB_KEY);
//set up database
mongoose.connect(process.env.DB_KEY, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
var app = (0, express_1.default)();
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// jwt setup
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
};
passport_1.default.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User_1.User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            //error
            return done(err, false);
        }
        if (user) {
            // found user
            return done(null, user);
        }
        else {
            //no user found
            return done(null, false);
            // or you could create a new account
        }
    });
}));
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
                return done(null, user);
            }
            else {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" });
            }
        });
    });
}));
app.use(passport_1.default.initialize());
//set cors header
// {
//   origin: "https://golden-queijadas-e8ee48.netlify.app",
//   credentials: true,
// }
app.use(cors());
app.use(function (req, res, next) {
    const allowedOrigins = [
        "https://bucolic-torte-a82b04.netlify.app",
        "https://golden-queijadas-e8ee48.netlify.app",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    next();
});
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });
//routes
app.use("/posts", posts_1.default);
app.use("/sign-in", sign_in_1.default);
app.use("/sign-up", sign_up_1.default);
app.use("/dashboard", dashboard_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
});
module.exports = app;
