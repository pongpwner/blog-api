import createError from "http-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
const mongoose = require("mongoose");
import postsRouter from "./routes/posts";
import signInRouter from "./routes/sign-in";
import signUpRouter from "./routes/sign-up";
import dashboardRouter from "./routes/dashboard";
import passport from "passport";
var cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
import { User, IUser } from "./models/User";
import { StrategyOptions, VerifiedCallback } from "passport-jwt";
require("dotenv").config();

console.log(process.env.DB_KEY);
//set up database
mongoose.connect(process.env.DB_KEY, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// jwt setup

var opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload: any, done: VerifiedCallback) {
    User.findOne({ id: jwt_payload.sub }, function (err: Error, user: IUser) {
      if (err) {
        //error
        return done(err, false);
      }
      if (user) {
        // found user
        return done(null, user);
      } else {
        //no user found
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
interface IPassportUser {
  id?: string;
}
passport.serializeUser((user: IPassportUser, done) => {
  return done(null, user.id);
});

//current problem is this is not being called
passport.deserializeUser((id, done) => {
  User.findById(id, function (err: Error, user: IUser) {
    if (err) {
      return done(err);
    }
    //assigns user to req.user
    done(null, user);
  });
});

// passprt.authenticate calls this callback

//done calls serializeUser
passport.use(
  new LocalStrategy(function verify(
    username: string,
    password: string,
    done: Function
  ) {
    User.findOne({ username: username }, (err: Error, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      bcrypt.compare(password, user.password, (err: Error, res: Object) => {
        if (res) {
          // passwords match! log user in

          return done(null, user);
        } else {
          // passwords do not match!

          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

app.use(passport.initialize());

//set cors header

// app.use(
//   cors({
//     origin: "https://bucolic-torte-a82b04.netlify.app",
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: "https://bucolic-torte-a82b04.netlify.app",
//     credentials: true,
//   })
// );

// app.use(function (req, res, next) {
//   const allowedOrigins = [
//     "https://bucolic-torte-a82b04.netlify.app",
//     "https://golden-queijadas-e8ee48.netlify.app",
//   ];
//   const origin: string = req.headers.origin!;
//   if (allowedOrigins.includes(origin)) {
//     cors({
//       origin: origin,
//       credentials: true,
//     });
//   }
//   next();
// });

// var corsOptions = {
//   origin: [
//     "https://bucolic-torte-a82b04.netlify.app",
//     "https://golden-queijadas-e8ee48.netlify.app",
//   ],
//   optionsSuccessStatus: 200, // For legacy browser support
// };

// app.use(function (req, res, next) {
//   if (req.headers.origin === "https://bucolic-torte-a82b04.netlify.app") {
//     cors({
//       origin: "https://bucolic-torte-a82b04.netlify.app",
//       optionsSuccessStatus: 200,
//     });
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://bucolic-torte-a82b04.netlify.app"
//     );
//     next();
//   } else if (
//     req.headers.origin === "https://golden-queijadas-e8ee48.netlify.app"
//   ) {
//     cors({
//       origin: "https://golden-queijadas-e8ee48.netlify.app",
//       optionsSuccessStatus: 200,
//     });
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://golden-queijadas-e8ee48.netlify.app"
//     );
//     next();
//   }
//   next();
// });
// app.use(function (req, res, next) {
//   const allowedOrigins = [
//     "https://bucolic-torte-a82b04.netlify.app",
//     "https://golden-queijadas-e8ee48.netlify.app",
//   ];
//   const origin: string = req.headers.origin!;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   next();
// });
// app.options("*", cors(corsOptions));
// app.use(cors(corsOptions));

var whitelist = [
  "https://bucolic-torte-a82b04.netlify.app",
  "https://golden-queijadas-e8ee48.netlify.app",
];
var corsOptions = {
  origin: function (origin: string, callback: Function) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

//routes

app.use("/posts", postsRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-up", signUpRouter);
app.use("/dashboard", dashboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
interface IStatusError extends Error {
  status: number;
}
app.use(function (
  err: IStatusError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
