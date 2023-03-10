import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({ summary: "Role yaratish" })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Barcha rolelarni olish" })
  @Get()
  async findAll() {
    return this.roleService.findAll();
  }

  // @ApiOperation({ summary: "Roleni ID bo'yicha olish" })
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.roleService.findOne(+id);
  // }

  @ApiOperation({ summary: "Roleni ID bo'yicha yangilash" })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Roleni ID bo'yicha o'chirish" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }

  @ApiOperation({ summary: "Roleni qiymati bo'yicha olish" })
  @Get(':value')
  async getRoleByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}