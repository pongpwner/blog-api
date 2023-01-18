"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = require("express-validator");
var router = express_1.default.Router();
/* GET home page. */
router.post("/", (0, express_validator_1.body)("username")
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage("username should be between 1 and 16 characters")
    .escape(), (0, express_validator_1.body)("password").escape(), function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //if error
        res.json({ message: "login failed", errors: errors });
    }
    else {
        //no errors
        console.log("try to sign in");
        passport_1.default.authenticate("local", {
            // successRedirect: "/",
            // failureRedirect: "/login",
            session: false,
        }, (err, user, info) => {
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
                const token = jsonwebtoken_1.default.sign(user.toJSON(), "secret", {
                    expiresIn: "1d",
                });
                return res.json({ user, token });
            });
        })(req, res);
    }
});
exports.default = router;
