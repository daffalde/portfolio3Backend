import express from "express";
import { getInfo } from "../controller/infoController.js";
import { authToken } from "../middleware/middleware.js";

export const routeInfo = express.Router();

routeInfo.get("/info", authToken, getInfo);
