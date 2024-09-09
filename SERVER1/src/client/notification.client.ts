import amqp from "amqplib";
import serverConfig from "../configs/server.config";

class NotificationClient {
  private channel: amqp.Channel;
  private connection: amqp.Connection;
  private URI: string;
  public queue: string;

  constructor() {
    this.URI = serverConfig.RABBITMQ_URL;
    this.queue = "messages";
  }

  public async connectWithRetry() {
    let backoff = 1000;
    const maxBackoff = 30000;

    while (true) {
      try {
        this.connection = await amqp.connect(this.URI);
        this.channel = await this.connection.createChannel();

        await this.channel.assertQueue(this.queue, {
          durable: false,
        });

        console.log(`Rabbit MQ is connected successfully!`);
        break;
      } catch (error) {
        console.log(
          `Error connecting to rabbit MQ, retrying in ${
            backoff / 1000
          } seconds...`
        );

        backoff = Math.min(backoff * 2, maxBackoff);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  public async sendMessages(message: string) {
    try {
      this.channel?.sendToQueue(
        this.queue,
        Buffer.from(JSON.stringify({ message }))
      );

      console.log("Message sent to the service 2");
    } catch (error) {
      console.log(`There was an error sending message!`);
      this.connectWithRetry();
      this.sendMessages(message);
    }
  }
}

export default new NotificationClient();
