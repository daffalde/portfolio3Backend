import express from "express";
import { routerAuth } from "./src/route/routeAuth.js";
import { routeInfo } from "./src/route/routeInfo.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "online" });
});

app.use("/auth", routerAuth);

app.use("/data", routeInfo);

app.listen(3000);
