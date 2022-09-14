import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosSchema } from '../schemas/productos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Productos', schema: ProductosSchema},
    ])
  ],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
