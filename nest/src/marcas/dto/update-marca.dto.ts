import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateMarcaDto } from './create-marca.dto';

export class UpdateMarcaDto extends PartialType(CreateMarcaDto) {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    slug?: string;

}
