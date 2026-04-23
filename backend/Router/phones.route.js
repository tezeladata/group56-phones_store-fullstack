import express from "express";
import { addPhone, deletePhone, editPhone, getAllPhones, getSinglePhone } from "../Controllers/phones.controllers.js";

// Router for phones
const phonesRouter = express.Router();

phonesRouter.route("/")
    .get(getAllPhones)
    .post(addPhone);

phonesRouter.route("/:id")
    .get(getSinglePhone)
    .put(editPhone)
    .delete(deletePhone);

export default phonesRouter;