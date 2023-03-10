import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Buyurtmalar')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiOperation({ summary: "Buyurtmani yaratish" })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Barcha buyurtmalarni olish" })
  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: "Buyurtmani ID bo'yicha olish" })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: "Buyurtmani ID bo'yicha yangilash" })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Buyurtmani ID bo'yicha o'chirish" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
