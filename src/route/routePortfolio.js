import express from "express";
import {
  getData,
  handleDelete,
  insertData,
  insertUpdate,
} from "../controller/portfolioController.js";
import { authToken } from "../middleware/middleware.js";

export const routePortfolio = express.Router();

routePortfolio.get("/portfolio", getData);
routePortfolio.post("/portfolio", authToken, insertData);
routePortfolio.delete("/portfolio/:id", authToken, handleDelete);
routePortfolio.patch("/portfolio/:id", authToken, insertUpdate);
