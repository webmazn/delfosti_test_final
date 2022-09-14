import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return await this.productosService.create(createProductoDto);

  }

  @Get()
  async findAll(): Promise<Producto[]> {
    return await this.productosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Producto> {
    return await this.productosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateProductoDto: UpdateProductoDto
  ): Promise<Producto> {
    return await this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Producto> {
    return await this.productosService.remove(id);
  }
}
