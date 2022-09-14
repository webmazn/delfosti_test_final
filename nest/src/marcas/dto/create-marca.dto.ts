import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarcaDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;
}

