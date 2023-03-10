import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: '3', description: 'Bururtma beruvchi IDsi' })
    @IsInt()
    equipment_id: number;

    @ApiProperty({ example: '2', description: 'Mahsulot IDsi' })
    @IsInt()
    user_id: number;

    @ApiProperty({ example: '2023-12-31', description: 'Mahsulot buyurtma berilgan sana' })
    @IsDateString()
    order_date: Date;

    @ApiProperty({ example: '5', description: 'Buyurtmalar miqdori' })
    @IsInt()
    amount: number;

    @ApiProperty({ example: '12.56', description: 'Umumiy summa' })
    @IsNumber()
    total_price: number;
}
