import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import path from "path";

import serverConfig from "./configs/server.config";

import { ProtoGrpcType } from "../../PROTO/src/proto/auth";
import { AuthentictionServiceHandlers } from "../../PROTO/src/proto/authPackage/AuthentictionService";

class AuthenticationGrpcServer {
  private server: grpc.Server;

  constructor() {
    const PROTO_FILE = "../PROTO/src/proto/auth.proto";

    const packageDefinition = protoLoader.loadSync(
      path.resolve(process.cwd(), PROTO_FILE)
    );

    const grpcObject = grpc.loadPackageDefinition(
      packageDefinition
    ) as unknown as ProtoGrpcType;

    this.server = new grpc.Server();

    this.server.addService(
      grpcObject.authPackage.AuthentictionService.service,
      this.functions()
    );
  }

  private functions(): AuthentictionServiceHandlers {
    return {
      getRandomNumber: (req, res) => {
        const message = req.request.message;

        if (message === "generate random number") {
          const randomNumber = Math.floor(Math.random() * 1000);
          res(null, { number: randomNumber });
        } else {
          console.log("A command is required");
        }
      },
    };
  }

  public start() {
    this.server.bindAsync(
      serverConfig.GRPC_URL,
      grpc.ServerCredentials.createInsecure(),
      (err) => {
        if (err) {
          console.log("There was an error connection to the grpc server");
          return;
        }
        console.log(`Grpc connected successfully!`);
      }
    );
  }
}

export default new AuthenticationGrpcServer();
