import express from "express";
import cors from "cors";
import { routerAuth } from "./src/route/routeAuth.js";
import { routeInfo } from "./src/route/routeInfo.js";
import { routePortfolio } from "./src/route/routePortfolio.js";
import { routePesan } from "./src/route/routePesan.js";
import { routeSosial } from "./src/route/routeSosial.js";
import { routeVisitor } from "./src/route/routeVisitor.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "online" });
});

app.post("/up", upload.single("file"), (req, res) => {
  res.json({ status: "di upload" });
});

app.use("/auth", routerAuth);

app.use("/data", routeInfo);
app.use("/data", routePortfolio);
app.use("/data", routePesan);
app.use("/data", routeSosial);
app.use("/data", routeVisitor);

app.listen(3000);
