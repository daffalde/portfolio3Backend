import express from "express";
import {
  getData,
  handleDelete,
  insertData,
} from "../controller/pesanController.js";
import { authToken } from "../middleware/middleware.js";

export const routePesan = express.Router();

routePesan.get("/pesan", authToken, getData);
routePesan.post("/pesan", insertData);
routePesan.delete("/pesan/:id", authToken, handleDelete);
