import express from "express";
import { getData, insertUpdate } from "../controller/infoController.js";
import { authToken } from "../middleware/middleware.js";
import { upload } from "../middleware/multer.js";

export const routeInfo = express.Router();

routeInfo.get("/info", getData);
routeInfo.patch("/info/:id", authToken, insertUpdate);
