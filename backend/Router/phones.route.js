import express from "express";
import { addPhone, deletePhone, editPhone, getAllPhones, getSinglePhone } from "../Controllers/phones.controller.js";
import {protect} from "../middlewares/auth.middleware.js";
import {allowedTo} from "../Controllers/roles.controller.js";
import upload from "../config/multer.js";

// Router for phones
const phonesRouter = express.Router();

phonesRouter.route("/")
    .get(getAllPhones)
    .post(protect, allowedTo("admin"), upload.array("images", 4), addPhone);

phonesRouter.route("/:id")
    .get(getSinglePhone)
    .put(protect, allowedTo("admin"), editPhone)
    .delete(protect, allowedTo("admin"), deletePhone);

export default phonesRouter;