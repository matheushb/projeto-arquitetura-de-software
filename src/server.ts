import express, {
  Application,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import { Controller } from "./infra/interfaces/controller.interface";

export class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on HTTP port ${port}`);
    });
  }

  public applyRoutes(controller: Controller[]): void {
    controller.forEach((c) => {
      this.app.use(c.getRouter());
    });
  }

  public applyMiddlewares(fns: (RequestHandler | ErrorRequestHandler)[]): void {
    fns.forEach((fn) => this.app.use(fn));
  }
}
