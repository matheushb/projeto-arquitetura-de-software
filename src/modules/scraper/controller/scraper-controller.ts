import { Request, Response, Router } from "express";
import { Mailer } from "../../../infra/mailer/mailer";
import { LogManager } from "../../../infra/logger/log-manager";
import { ScrapingMethodFactory } from "../services/scraper/scraping-method.factory";
import { Controller } from "../../../infra/interfaces/controller.interface";

export class ScraperController implements Controller {
  private router: Router;
  private logMananager = LogManager.getInstance();

  constructor(private readonly mailer: Mailer) {
    this.router = Router();
    this.setRoutes();
  }

  async handle(req: Request, res: Response) {
    const search = req.params["input"];
    const source = req.params["source"];
    const mail = "user@mail.com"; //mockado, mas seria referente ao usuário logado/organização.

    const scrapingMethod = ScrapingMethodFactory.createScraper(source);

    const result = await scrapingMethod.handle(search);

    this.logMananager.addLog(JSON.stringify(result));

    if (result && result.length) {
      await this.mailer.sendMail({
        from: "no-reply@thronosec.com",
        html: JSON.stringify(result, null, 2),
        subject: "Dados vazados identificados: ",
        to: mail,
      });
    }

    res.status(200).json(result);
  }

  setRoutes() {
    this.router.get("/scraper/:source/:input", this.handle.bind(this));
  }

  getRouter() {
    return this.router;
  }
}
