import express from "express";
import { getData, insertUpdate } from "../controller/sosial.Controller.js";
import { authToken } from "../middleware/middleware.js";

export const routeSosial = express.Router();

routeSosial.get("/sosial", getData);
routeSosial.patch("/sosial/:id", authToken, insertUpdate);
