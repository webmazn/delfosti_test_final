import { Module } from '@nestjs/common';
import { MongooseModule  } from '@nestjs/mongoose';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://webmazn:HqfkvcHE81bgXfNH@webmazn.yxchdlx.mongodb.net/?retryWrites=true&w=majority'
    ),
    ProductosModule,
    CategoriasModule,
    MarcasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}