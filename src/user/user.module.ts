import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from 'src/role/models/role.model';
import { UserRole } from 'src/role/models/user-role.model';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole]),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
