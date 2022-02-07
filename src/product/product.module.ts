import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientModuleOptions } from './grpc-client-module.options';

@Module({
  imports: [ClientsModule.register(grpcClientModuleOptions)],
  controllers: [ProductController],
})
export class ProductModule {}
