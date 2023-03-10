import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Foydalanuvchi roli' })
    @IsNotEmpty()
    @IsString()
    readonly value: string;

    @ApiProperty({ example: 'Bu AMDIN uchun role', description: 'Rol uchun izoh' })
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
