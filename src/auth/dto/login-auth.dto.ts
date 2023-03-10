import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'john@gmail.com', description: 'Foydalanuvchi emaili' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'Uzbek!$t@n', description: 'Foydalanuvchi paroli' })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}