import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MarcasService {

  constructor(
    @InjectModel('Marcas') private marcasModel: Model<Marca>
  ){
  }

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const marca = new this.marcasModel(createMarcaDto);
    return await marca.save();
  }

  async findAll(): Promise<Marca[]> {
    const marcas = await this.marcasModel.find()
    return marcas;
  }

  async findOne(id: string): Promise<Marca> {
    const marca = await this.marcasModel.findById(id);
    return marca;
  }

  async update(id: string, updateMarcaDto: UpdateMarcaDto) {
    const marcaActualizada = await this.marcasModel.findByIdAndUpdate(id, updateMarcaDto, {new: true})
    return marcaActualizada;
  }

  async remove(id: string): Promise<Marca> {
    const marcaEliminada = await this.marcasModel.findByIdAndDelete(id);
    return marcaEliminada;
  }
}
