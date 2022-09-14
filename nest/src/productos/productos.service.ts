import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductosService {

  // private productos: Producto[] = [
  //   { id:1, name:'Samsung', category:'Móviles', slug:'celular', createdAt: new Date},
  //   { id:2, name:'LG', category:'Televisores', slug:'tv', createdAt: new Date},
  //   { id:3, name:'Motorola', category:'Móviles', slug:'celular', createdAt: new Date},
  //   { id:4, name:'Xiomi', category:'Televisores', slug:'tv', createdAt: new Date},
  //   { id:5, name:'IPhone', category:'Móviles', slug:'celular', createdAt: new Date},
  // ];

  constructor(
    @InjectModel('Productos') private productosModel: Model<Producto>
  ){
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    // // // console.log(`${createProductoDto}`);
    // // // console.log({createProductoDto});
    // // const producto = new Producto();
    // // producto.id = Math.max( ...this.productos.map( producto => producto.id),0 ) + 1;
    // // producto.name = createProductoDto.name
    // // producto.category = createProductoDto.category
    // // producto.slug = createProductoDto.slug
    // // this.productos.push(producto);
    // // // return 'This action adds a new producto';
    // // return producto;
    const producto = new this.productosModel(createProductoDto);
    return await producto.save();
  }

  async findAll(): Promise<Producto[]> {
    // return `This action returns all productos`;
    // // return this.productos;

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
      })
    return productos;
  }

  async findOne(id: string): Promise<Producto> {
    // // const producto = this.productos.find( producto => producto.id === id);
    // // if ( !producto ) throw new NotFoundException(`Producto con id: ${id} no encontrado`)
    // return `This action returns a #${id} producto`;
    // // return producto;
    const producto = await this.productosModel.findById(id);
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    // // const { name, category, slug } = updateProductoDto
    // // const producto = this.findOne( id );
    // // if( name ) producto.name = name
    // // if( category ) producto.category = category
    // // if( slug) producto.slug = slug

    // // this.productos = this.productos.map( dbProductos => {
    // //   if( dbProductos.id === id) return producto;
    // //   return dbProductos;
    // // })
    // return `This action updates a #${id} producto`;
    // // return producto;
    const productoActualizado = await this.productosModel.findByIdAndUpdate(id, updateProductoDto, {new: true})
    return productoActualizado;
  }

  async remove(id: string): Promise<Producto> {
    // // this.findOne( id );
    // // this.productos = this.productos.filter( producto => producto.id !== id)
    // return `This action removes a #${id} producto`;
    const productoEliminado = await this.productosModel.findByIdAndDelete(id);
    return productoEliminado;
  }
}
