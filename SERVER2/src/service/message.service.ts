import amqp from "amqplib";
import serverConfig from "../configs/server.config";
import firstHelper from "../helper/first.helper";
import serverController from "../controller/server.controller";

class NotificationService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private queue: string;

  constructor() {
    this.queue = "messages";
  }

  public async init() {
    await this.connectWithRetry();
    this.handleMessages();
  }

  public async connectWithRetry() {
    let backoff = 1000;
    let maxBackoff = 30000;
    while (true) {
      try {
        this.connection = await amqp.connect(
          serverConfig.RABBITMQ_URL as string
        );
        this.channel = await this.connection.createChannel();

        console.log(`Connected to Rabbit MQ`);
        break;
      } catch (error) {
        console.log(
          `There was an error connecting to Rabbit MQ, retrying in ${
            backoff / 1000
          }...seconds`
        );
        backoff = Math.min(backoff * 2, maxBackoff);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  public async handleMessages() {
    await this.channel?.assertQueue(this.queue, {
      durable: false,
    });

    this.channel?.consume("messages", async (msg) => {
      try {
        if (msg !== null) {
          const data = JSON.parse(msg.content.toString());

          if (data.message === "generate random number") {
            const { number } = await firstHelper.generateRandomNumber(data);
            await serverController.randomNumber(number);
            this.channel.ack(msg);
          } else {
            console.log(`Not the right command`);
            this.channel.ack(msg);
          }
        }
      } catch (error) {
        console.log(`There was an error handling message`);
        this.connectWithRetry();
        this.handleMessages();
      }
    });
  }
}

export default new NotificationService();
