// const session = require("express-session");
const bcrypt = require("bcrypt");
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
import { User, IUser } from "./models/User";
//runs on login
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
    console.log("verify");
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
          console.log("user log in from verify");
          return done(null, user);
        } else {
          // passwords do not match!

          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);
//set up session

// app.use(
//   session({
//     secret: "pong",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: mongoDB }),
//     cookie: {
//       expires: 60 * 60 * 24 * 1000,
//     },
//   })
// );
//checks if current session has req.session.passport, if so saves user id onto it
//app.use(passport.initialize());
//calls passport authenticator,
//1. Takes the MongoDB user ID obtained from the `passport.initialize()` method (run directly before) and passes it to the `passport.deserializeUser()` function (defined above in this module).  The `passport.deserializeUser()`
//If the `passport.deserializeUser()` returns a user object, this user object is assigned to the `req.user` property
// app.use(passport.session());

// app.use(passport.authenticate("session"));
