"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
var router = express_1.default.Router();
router.post("/", (0, express_validator_1.body)("username")
    .trim()
    .isLength({ min: 1, max: 16 })
    .withMessage("username should be between 1 and 16 characters")
    .escape(), (0, express_validator_1.body)("password").escape(), (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        //validation errors
        res.json({ message: "sign up failed", errors: errors });
    }
    else {
        //no validation errors
        console.log(req.body);
        bcrypt_1.default.hash(req.body.password, 10, function (err, hash) {
            //check err
            if (err) {
                return next(err);
            }
            let userDetails = {
                username: req.body.username,
                password: hash,
            };
            console.log(userDetails);
            let newUser = new User_1.User(userDetails);
            //save user to database
            console.log(newUser);
            newUser.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json({ status: "created account" });
            });
        });
    }
});
exports.default = router;
