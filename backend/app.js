import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import phonesRouter from "./Router/phones.route.js";
import globalErrorHandler from "./Controllers/error.controller.js";
import authRouter from "./Router/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// enable env variables
dotenv.config();

// create a server
const app = express();

// cors configuration
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// data parser middleware
app.use(express.json());
// data logger middleware
app.use(morgan("dev"));
// cookie parsing
app.use(cookieParser());

// Routers
app.use("/api/status", (req, res, next) => {
    res.status(200).send("Server is running");
    next()
})
app.use("/api/phones", phonesRouter);
app.use("/api/auth", authRouter);

app.use(globalErrorHandler)

// connect to database and start server
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to database");

        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
    })