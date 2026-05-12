import express from "express";

// Controllers
import { login, logout, signUp, verify } from "../Controllers/auth.controller.js";
// Middlewares
import {protect} from "../middlewares/auth.middleware.js"

const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

// verify
authRouter.get("/verify/:code", verify);

// log in
authRouter.post("/logIn", login);

// log out
authRouter.get("/logout", logout);

// auto-login
authRouter.post("/auto-login", protect, async (req, res, next) => {
    res.status(200).json(req.user)
})

export default authRouter;