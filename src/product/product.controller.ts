import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateProduct } from './interfaces/create-product.interface';
import { ProductById } from './interfaces/product-by-id.interface';
import { Product } from './interfaces/product.interface';

interface ProductService {
  create(data: CreateProduct): Observable<Product>;
  // update;
  findOne(data: ProductById): Observable<Product>;
  findAll(): Observable<any>;
  delete(data: ProductById): Observable<any>;
}

@Controller('product')
export class ProductController implements OnModuleInit {
  private productGrpcService: ProductService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productGrpcService =
      this.client.getService<ProductService>('ProductService');
  }

}
