import express, { Application } from "express";
import notificationService from "./service/message.service";
import first from "./client/first.client";

class App {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 8082;

    this.routes(this.app);
  }

  public start() {
    notificationService.init();

    this.app.listen(this.port, () => {
      console.log(`Server is listening at port ${this.port}`);
    });
  }

  private routes(app: Application) {
    app.get("/", (req, res) => {
      res.send(`Server 2 hit!`);
    });
  }
}

const app = new App();
app.start();
