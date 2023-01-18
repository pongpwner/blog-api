import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { body, validationResult } from "express-validator";
var router = express.Router();

/* GET home page. */
router.post(
  "/",
  body("username")
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage("username should be between 1 and 16 characters")
    .escape(),
  body("password").escape(),
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if error
      res.json({ message: "login failed", errors: errors });
    } else {
      //no errors

      console.log("try to sign in");
      passport.authenticate(
        "local",
        {
          // successRedirect: "/",
          // failureRedirect: "/login",
          session: false,
        },
        (err, user, info) => {
          if (err || !user) {
            return res.status(400).json({
              message: "Something is not right",
              user: user,
            });
          }
          console.log("1");
          req.login(user, { session: false }, (err) => {
            if (err) {
              res.send(err);
            }
            console.log("2");
            // generate a signed son web token with the contents of user object and return it in the response

            const token = jwt.sign(user.toJSON(), "secret", {
              expiresIn: "1d",
            });

            return res.json({ user, token });
          });
        }
      )(req, res);
    }
  }
);

export default router;
