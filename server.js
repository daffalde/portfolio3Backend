import express from "express";
import { routerAuth } from "./src/route/routeAuth.js";
import { routeInfo } from "./src/route/routeInfo.js";
import { routePortfolio } from "./src/route/routePortfolio.js";
import { routePesan } from "./src/route/routePesan.js";
import { routeSosial } from "./src/route/routeSosial.js";
import { routeVisitor } from "./src/route/routeVisitor.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "online" });
});

app.use("/auth", routerAuth);

app.use("/data", routeInfo);
app.use("/data", routePortfolio);
app.use("/data", routePesan);
app.use("/data", routeSosial);
app.use("/data", routeVisitor);

app.listen(3000);
