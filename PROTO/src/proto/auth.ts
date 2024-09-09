import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthentictionServiceClient as _authPackage_AuthentictionServiceClient, AuthentictionServiceDefinition as _authPackage_AuthentictionServiceDefinition } from './authPackage/AuthentictionService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  authPackage: {
    AuthentictionService: SubtypeConstructor<typeof grpc.Client, _authPackage_AuthentictionServiceClient> & { service: _authPackage_AuthentictionServiceDefinition }
    order: MessageTypeDefinition
    value: MessageTypeDefinition
  }
}

