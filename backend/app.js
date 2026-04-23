import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import phonesRouter from "./Router/phones.route.js";
import globalErrorHandler from "./Controllers/error.controller.js";

// create a server
const app = express();

// enable env variables
dotenv.config();

// data parser middleware
app.use(express.json());
// data logger middleware
app.use(morgan("dev"));

// Routers
app.use("/api/status", (req, res, next) => {
    res.status(200).send("Server is running");
    next()
})
app.use("/api/phones", phonesRouter);

app.use(globalErrorHandler)

// connect to database and start server
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to database");

        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
    })