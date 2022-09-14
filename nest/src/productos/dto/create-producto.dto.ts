import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateProductoDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    // @IsString()
    // @IsNotEmpty()
    // category: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    // @IsDate()
    // @IsNotEmpty()
    createdAt: Date;
}
