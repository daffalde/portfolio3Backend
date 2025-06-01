import express from "express";
import { insertData } from "../controller/visitorController.js";
import { authToken } from "../middleware/middleware.js";

export const routeVisitor = express.Router();

routeVisitor.post("/visitor", insertData);
