import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductosService {

  constructor(
    @InjectModel('Productos') private productosModel: Model<Producto>
  ){
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = new this.productosModel(createProductoDto);
    return await producto.save();
  }

  async findAll(): Promise<Producto[]> {
    // const productos = await this.productosModel.find()
    const productos = await this.productosModel.find()
      // .where('status').equals(true) 
      .populate({ // relacion con Categorias
        path: 'category'
      })
      .populate({ // relacion con marcas
        path: 'brand'        
      })
      .sort({ // ordenamiento descendente
        'createdAt': 'desc'
      });
    return productos;
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productosModel.findById(id)
      // .where('status').equals(true) 
      .populate({ // relacion con Categorias
        path: 'category'
      })
      .populate({ // relacion con marcas
        path: 'brand'        
      });
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const productoActualizado = await this.productosModel.findByIdAndUpdate(id, updateProductoDto, {new: true})
    return productoActualizado;
  }

  async remove(id: string): Promise<Producto> {
    const productoEliminado = await this.productosModel.findByIdAndDelete(id);
    return productoEliminado;
  }
}
