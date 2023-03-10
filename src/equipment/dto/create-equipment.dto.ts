import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateEquipmentDto {
    @ApiProperty({ example: 'Nom', description: 'Mahsulot nomi' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '4.99', description: 'Mahsulot narxi' })
    @IsDecimal()
    price: number;

    @ApiProperty({ example: 'https://picsum.photos/id/238/200/300', description: 'Mahsulot rasmi adresi' })
    @IsUrl()
    image: string;

    @ApiProperty({ example: 'Izoh yana izoh. Va yana izoh', description: 'Mahsulot uchun izoh' })
    @IsNotEmpty()
    @IsString()
    description: string;
}
