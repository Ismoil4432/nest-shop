import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './models/equipment.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EquipmentService {
  constructor(@InjectModel(Equipment) private equipmentRepo: typeof Equipment) { }

  async create(createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentRepo.create(createEquipmentDto);
  }

  async findAll() {
    return this.equipmentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.equipmentRepo.findOne({
      where: { id },
      include: { all: true }
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentRepo.update({ ...updateEquipmentDto }, {
      where: { id },
      returning: true
    });
    return equipment[1][0];
  }

  async remove(id: number) {
    return this.equipmentRepo.destroy({
      where: { id }
    });
  }
}
