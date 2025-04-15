import { Request, Response, Router } from "express";
import { ScraperHandler } from "../services/scraper-service";
import { Mailer } from "../../../infra/mailer/mailer";
import { LogManager } from "../../../infra/logger/log-manager";

export class ScraperController {
  private router: Router;
  private logMananager = LogManager.getInstance();

  constructor(
    private readonly scraperService: ScraperHandler,
    private readonly mailer: Mailer
  ) {
    this.router = Router();
    this.setRoutes();
  }

  async handle(req: Request, res: Response) {
    console.log(req.params);

    const email = req.params["email"];
    const search = req.params["input"];

    const result = await this.scraperService.handle(search);

    this.logMananager.addLog(JSON.stringify(result));

    console.log("sending");

    this.logMananager.addLog("sending email to " + email);

    await this.mailer.sendMail({
      from: "abc@gmail.com",
      html: JSON.stringify(result, null, 2),
      subject: "Dados vazados identificados: ",
      to: email,
    });

    this.logMananager.addLog("email sent to " + email);

    res.json(result);
    return;
  }

  setRoutes() {
    this.router.get("/scrape-data/:input/:email", this.handle.bind(this));
  }

  getRouter() {
    return this.router;
  }
}
