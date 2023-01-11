"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
/* GET home page. */
router.post("/", function (req, res, next) {
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
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jsonwebtoken_1.default.sign(user, "secret");
            return res.json({ user, token });
        });
    })(req, res);
});
exports.default = router;
