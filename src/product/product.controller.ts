import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateProduct } from './interfaces/create-product.interface';
import { ProductById } from './interfaces/product-by-id.interface';
import { Product } from './interfaces/product.interface';
import { UpdateProduct } from './interfaces/update-product.interface';

interface ProductService {
  create(data: CreateProduct): Observable<Product>;
  update(data: UpdateProduct): Observable<Product>;
  findOne(data: ProductById): Observable<Product>;
  findAll(): Observable<{ data: Product[] }>;
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

  @Get()
  findALl() {
    const res = this.productGrpcService.findAll();
    console.log(lastValueFrom(res));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await lastValueFrom(this.productGrpcService.findOne({ id }));
    } catch (error) {
      throw new NotFoundException('product not found');
    }
  }

  @Post()
  create(@Body() data: CreateProduct) {
    return lastValueFrom(this.productGrpcService.create(data));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateProduct) {
    const req = { id, ...data };
    return lastValueFrom(this.productGrpcService.update(req));
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return lastValueFrom(this.productGrpcService.delete({ id }));
  }
}
