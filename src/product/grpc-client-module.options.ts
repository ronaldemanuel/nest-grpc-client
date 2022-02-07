import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientModuleOptions: ClientsModuleOptions = [
  {
    name: 'PRODUCT_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'product',
      protoPath: join(__dirname, 'product.proto'),
    },
  },
];
