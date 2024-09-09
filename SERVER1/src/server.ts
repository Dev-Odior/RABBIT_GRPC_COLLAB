import express, { Application } from "express";
import grpc from "./grpc";
import notificationClient from "./client/notification.client";

class App {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 8081;

    this.routes(this.app);
  }

  public start() {
    notificationClient.connectWithRetry();

    grpc.start();

    this.app.listen(this.port, () => {
      console.log(`Server is listening at port ${this.port}`);
    });
  }

  private routes(app: Application) {
    app.get("/random", async (req, res) => {
      await notificationClient.sendMessages("generate random number");
      res.send(`Sent the command`);
    });
  }
}

const app = new App();
app.start();
