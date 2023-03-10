import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Mahsulotlar')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiOperation({ summary: "Mahsulotni yaratish" })
  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @Get()
  async findAll() {
    return this.equipmentService.findAll();
  }

  @ApiOperation({ summary: "Mahsulotni ID bo'yicha olish" })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @ApiOperation({ summary: "Mahsulotni ID bo'yicha yangilash" })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @ApiOperation({ summary: "Mahsulotni ID bo'yicha o'chirish" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
