import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    slug?: string;

}
