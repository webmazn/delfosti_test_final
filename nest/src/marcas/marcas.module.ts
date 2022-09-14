import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MarcasSchema } from '../schemas/marcas.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Marcas', schema: MarcasSchema}
    ])
  ],
  controllers: [MarcasController],
  providers: [MarcasService]
})
export class MarcasModule {}
