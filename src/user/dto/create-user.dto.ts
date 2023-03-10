import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'Foydalanuvchi ismi' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'john@gmail.com', description: 'Foydalanuvchi emaili' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'Uzbek!$t@n', description: 'Foydalanuvchi paroli' })
    @IsStrongPassword()
    @MinLength(10)
    readonly password: string;

    @ApiProperty({ example: '+998987654321', description: 'Foydalanuvchi telefon raqami' })
    @IsPhoneNumber()
    readonly phone_number: string;

    @ApiProperty({ example: 'Tashkent, Uzbekistan', description: 'Foydalanuvchi manzili' })
    @IsNotEmpty()
    @IsString()
    readonly location: string
}
