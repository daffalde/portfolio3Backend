import express from "express";
import {
  getData,
  handleDelete,
  insertData,
  insertUpdate,
} from "../controller/portfolioController.js";
import { authToken } from "../middleware/middleware.js";
import { upload } from "../middleware/multer.js";

export const routePortfolio = express.Router();

routePortfolio.get("/portfolio", getData);
routePortfolio.post(
  "/portfolio",
  authToken,
  upload.fields([
    { name: "gambar", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  insertData
);
routePortfolio.delete("/portfolio/:id", authToken, handleDelete);
routePortfolio.patch(
  "/portfolio/:id",
  authToken,
  upload.fields([
    { name: "gambar", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  insertUpdate
);
