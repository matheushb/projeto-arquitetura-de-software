import { Mailer } from "./infra/mailer/mailer";
import { LogController } from "./modules/logger/controller/log.controller";
import { ScraperController } from "./modules/scraper/controller/scraper-controller";
import { Server } from "./server";

async function bootstrap() {
  const app = new Server();

  const scraperController = new ScraperController(new Mailer());
  const logController = new LogController();

  app.applyRoutes([scraperController, logController]);

  app.listen(3000);
}

bootstrap();
