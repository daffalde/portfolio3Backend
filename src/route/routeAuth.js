import express from "express";
import { handleReg, handleLogin } from "../controller/authController.js";

export const routerAuth = express.Router();

routerAuth.post("/register", handleReg);
routerAuth.post("/login", handleLogin);
