import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { User } from 'src/user/models/user.model';
import { UserRole } from './models/user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule { }
