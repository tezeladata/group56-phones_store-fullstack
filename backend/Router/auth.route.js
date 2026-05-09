import express from "express";

// Controllers
import { login, logout, signUp, verify } from "../Controllers/auth.controller.js";

const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

// verify
authRouter.get("/verify/:code", verify);

// log in
authRouter.post("/logIn", login);

// log out
authRouter.get("/logout", logout);

export default authRouter;