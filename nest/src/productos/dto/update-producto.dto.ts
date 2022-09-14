import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsUrl()
    slug?: string;
    
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    status?: Boolean;

    // @IsDate()
    // @IsNotEmpty()
    // @IsOptional()
    createdAt?: Date;
    
}
