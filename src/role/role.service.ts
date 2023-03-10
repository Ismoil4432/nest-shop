import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

  async create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto);
  }

  async findAll() {
    return this.roleRepository.findAll({ include: { all: true } });
  }

  // async findOne(id: number) {
  //   return this.roleRepository.findOne({
  //     where: { id },
  //     include: { all: true }
  //   });
  // }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.update({ ...updateRoleDto }, {
      where: { id },
      returning: true
    });
    return role[1][0];
  }

  async remove(id: number) {
    return this.roleRepository.destroy({
      where: { id }
    });
  }

  async getRoleByValue(value: string) {
    return this.roleRepository.findOne({ 
      where: { value } 
    });
  }
}