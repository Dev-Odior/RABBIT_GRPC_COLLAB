import { config } from "dotenv";
config();

class ServerConfig {
  public RABBITMQ_URL = process.env.RABBITMQ_URL;
  public GRPC_URL = process.env.GRPC_URL;
}

export default new ServerConfig();
