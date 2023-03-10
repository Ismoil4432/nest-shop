import { Module, forwardRef } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './models/equipment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [SequelizeModule.forFeature([Equipment]), forwardRef(() => OrderModule)],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService]
})
export class EquipmentModule { }
