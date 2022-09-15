import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductoDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    // @IsDate()
    // @IsNotEmpty()
    createdAt: Date;

    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    status: Boolean;
}
