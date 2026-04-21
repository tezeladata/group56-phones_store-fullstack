import express from "express";
import { addPhone, getAllPhones, getSinglePhone } from "../Controllers/phones.controllers.js";

// Router for phones
const phonesRouter = express.Router();

phonesRouter.route("/")
    .get(getAllPhones)
    .post(addPhone);

phonesRouter.route("/:id")
    .get(getSinglePhone)
//     .put()
//     .delete();

export default phonesRouter;