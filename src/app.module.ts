import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import { EquipmentModule } from './equipment/equipment.module';
import { OrderModule } from './order/order.module';
import { User } from './user/models/user.model';
import { Equipment } from './equipment/models/equipment.model';
import { Order } from './order/models/order.model';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserRole } from './role/models/user-role.model';
import { Role } from './role/models/role.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRole, Equipment, Order],
      autoLoadModels: true,
      logging: false
    }),
    UserModule,
    EquipmentModule,
    OrderModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
