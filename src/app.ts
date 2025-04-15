import express from "express";
import { ScraperController } from "./modules/scraper/controller/scraper-controller";
import { ScraperHandler } from "./modules/scraper/services/scraper-service";
import { Mailer } from "./infra/mailer/mailer";
import { LogController } from "./modules/logger/controller/log.controller";

const app = express();

app.use(express.json());

const scraperController = new ScraperController(
  new ScraperHandler(),
  new Mailer()
);

const logController = new LogController();

app.use(scraperController.getRouter());
app.use(logController.getRouter());

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
