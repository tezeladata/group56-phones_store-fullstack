import express from "express";

// Controllers
import { signUp } from "../Controllers/auth.controller.js";

const authRouter = express.Router();

// Sign up
authRouter.post("/signUp", signUp);

export default authRouter;