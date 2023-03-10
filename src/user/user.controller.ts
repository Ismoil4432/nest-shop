import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@ApiTags('Foydalanuvchilar')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: "Foydalanuvchini yaratish" })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchini ID bo'yicha olish" })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini ID bo'yicha yangilash" })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini ID bo'yicha o'chirish" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchiga role qo'shish" })
  @Post('role/add')
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: "Foydalanuvchidan roleni o'chirish" })
  @HttpCode(200)
  @Post('role/remove')
  async removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini aktiv qilish" })
  @Post('activate')
  async activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini deaktiv qilish" })
  @Post('deactivate')
  async deactivateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.deactivateUser(activateUserDto);
  }
}
