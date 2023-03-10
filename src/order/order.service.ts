import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order) { }

  async create(createOrderDto: CreateOrderDto) {
    return this.orderRepo.create(createOrderDto);
  }

  async findAll() {
    return this.orderRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.orderRepo.findOne({
      where: { id },
      include: { all: true }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.update({ ...updateOrderDto }, {
      where: { id },
      returning: true
    });
    return order[1][0];
  }

  async remove(id: number) {
    return this.orderRepo.destroy({
      where: { id }
    });
  }
}
