// Original file: src/proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { order as _authPackage_order, order__Output as _authPackage_order__Output } from '../authPackage/order';
import type { value as _authPackage_value, value__Output as _authPackage_value__Output } from '../authPackage/value';

export interface AuthentictionServiceClient extends grpc.Client {
  getRandomNumber(argument: _authPackage_order, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_value__Output>): grpc.ClientUnaryCall;
  getRandomNumber(argument: _authPackage_order, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_value__Output>): grpc.ClientUnaryCall;
  getRandomNumber(argument: _authPackage_order, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_value__Output>): grpc.ClientUnaryCall;
  getRandomNumber(argument: _authPackage_order, callback: grpc.requestCallback<_authPackage_value__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthentictionServiceHandlers extends grpc.UntypedServiceImplementation {
  getRandomNumber: grpc.handleUnaryCall<_authPackage_order__Output, _authPackage_value>;
  
}

export interface AuthentictionServiceDefinition extends grpc.ServiceDefinition {
  getRandomNumber: MethodDefinition<_authPackage_order, _authPackage_value, _authPackage_order__Output, _authPackage_value__Output>
}
