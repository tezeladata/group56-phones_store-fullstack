import express from "express";
import { getAllPhones } from "../Controllers/phones.controllers.js";

// Router for phones
const phonesRouter = express.Router();

phonesRouter.route("/")
    .get(getAllPhones)
    // .post();

// phonesRouter.route("/:id")
//     .get()
//     .put()
//     .delete();

export default phonesRouter;