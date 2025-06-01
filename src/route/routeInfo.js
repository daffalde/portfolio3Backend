import express from "express";
import { getData, insertUpdate } from "../controller/infoController.js";
import { authToken } from "../middleware/middleware.js";

export const routeInfo = express.Router();

routeInfo.get("/info", getData);
routeInfo.patch(
  "/info/:id",
  authToken,
  upload.fields([{ name: "picture", maxCount: 1 }]),
  insertUpdate
);
