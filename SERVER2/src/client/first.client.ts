import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import path from "path";

import { ProtoGrpcType } from "../../../PROTO/src/proto/auth";
import serverConfig from "../configs/server.config";

import { AuthentictionServiceClient } from "../../../PROTO/src/proto/authPackage/AuthentictionService";

class ClientOne {
  public client: AuthentictionServiceClient;

  constructor() {
    const PROTO_FILE = "../../../PROTO/src/proto/auth.proto";

    const packageDefinition = protoLoader.loadSync(
      path.resolve(__dirname, PROTO_FILE)
    );

    const grpcObject = grpc.loadPackageDefinition(
      packageDefinition
    ) as unknown as ProtoGrpcType;

    this.client = new grpcObject.authPackage.AuthentictionService(
      serverConfig.GRPC_URL as string,
      grpc.credentials.createInsecure()
    );

    const deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 5);

    this.client.waitForReady(deadline, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  public get Client() {
    return this.client;
  }
}

const firstClint = new ClientOne();

export default firstClint.Client;
