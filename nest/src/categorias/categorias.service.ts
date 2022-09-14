import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectModel('Categorias') private categoriasModel: Model<Categoria>
  ){
  }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = new this.categoriasModel(createCategoriaDto);
    return await categoria.save();
  }

  async findAll(): Promise<Categoria[]> {
    const categorias = await this.categoriasModel.find()
    return categorias;
  }

  async findOne(id: string): Promise<Categoria>  {
    const categoria = await this.categoriasModel.findById(id);
    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoriaActualizada = await this.categoriasModel.findByIdAndUpdate(id, updateCategoriaDto, {new: true})
    return categoriaActualizada;
  }

  async remove(id: string): Promise<Categoria>  {
    const categoriaEliminada = await this.categoriasModel.findByIdAndDelete(id);
    return categoriaEliminada;
  }
}
