import express from "express";
import { getData, insertData } from "../controller/visitorController.js";

export const routeVisitor = express.Router();

routeVisitor.post("/visitor", insertData);
routeVisitor.get("/visitor", getData);
