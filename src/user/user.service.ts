import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

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
    const user = await this.userRepo.findOne({
      where: { id },
      include: { all: true }
    });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update({ ...updateUserDto }, {
      where: { id },
      returning: true
    });
    if (!user[1][0]) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return user[1][0];
  }

  async remove(id: number) {
    const user = await this.userRepo.destroy({ where: { id } });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true }
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.user_id);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return user;
    }

    throw new HttpException(
      'Foydalanuvchi yoki role topilmadi',
      HttpStatus.NOT_FOUND
    );
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.user_id);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$remove('role', role.id);
      return user;
    }

    throw new HttpException(
      'Foydalanuvchi yoki role topilmadi',
      HttpStatus.NOT_FOUND
    );
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.user_id);

    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    user.is_active = true;
    await user.save();
    return user;
  }

  async deactivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.user_id);

    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    user.is_active = false;
    await user.save();
    return user;
  }
}
