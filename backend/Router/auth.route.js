import express from "express";

// Controllers
import { login, signUp, verify } from "../Controllers/auth.controller.js";

const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

// verify
authRouter.get("/verify/:code", verify);

// log in
authRouter.post("/logIn", login);

export default authRouter;