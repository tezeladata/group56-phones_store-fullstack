import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import phonesRouter from "./Router/phones.route.js";

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

// start server
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))