import express from "express";
import bodyParser from "body-parser";
import router from "./scraper-controller";
import { path } from "../views/path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
