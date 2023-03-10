import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: "Foydalanuvchi uchun qo'shimcha role" })
    @IsNotEmpty()
    @IsString()
    readonly value: string;

    @ApiProperty({ example: '2', description: "Foydalanuvchi IDsi" })
    @IsInt()
    readonly user_id: number;
}