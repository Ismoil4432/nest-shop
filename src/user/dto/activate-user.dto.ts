import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class ActivateUserDto {
    @ApiProperty({ example: '2', description: "Foydalanuvchini activate/deactivate qilish uchun uning IDsi" })
    @IsInt()
    readonly user_id: number;
}
