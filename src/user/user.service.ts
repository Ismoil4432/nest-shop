import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly roleService: RoleService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.roleService.getRoleByValue('USER');
    // const role = await this.roleService.getRoleByValue('ADMIN');

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    await newUser.$set('role', [role.id]);
    await newUser.save();
    newUser.role = [role];

    return newUser;
  }

  async findAll() {
    return this.userRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      include: { all: true }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update({ ...updateUserDto }, {
      where: { id },
      returning: true
    });
    return user[1][0];
  }

  async remove(id: number) {
    return this.userRepo.destroy({
      where: { id }
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true }
    });
    return user;
  }
}
