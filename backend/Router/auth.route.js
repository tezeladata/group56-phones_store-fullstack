import express from "express";

// Controllers
import { signUp, verify } from "../Controllers/auth.controller.js";

const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

// verify
authRouter.get("/verify/:code", verify);

export default authRouter;