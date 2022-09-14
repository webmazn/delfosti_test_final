import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasSchema } from '../schemas/categorias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Categorias', schema: CategoriasSchema},
    ])
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
