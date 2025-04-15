import { Request, Response, Router } from "express";
import { LogManager } from "../../../infra/logger/log-manager";

export class LogController {
  private router: Router;
  private logMananager = LogManager.getInstance();

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  async handle(req: Request, res: Response) {
    res.json(this.logMananager.getLogs());
    return;
  }

  setRoutes() {
    this.router.get("/logs", this.handle.bind(this));
  }

  getRouter() {
    return this.router;
  }
}
