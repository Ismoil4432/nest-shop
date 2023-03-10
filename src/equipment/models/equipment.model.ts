import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";

interface EquipmentCreationAttrs {
    name: string;
    price: number;
    image: string;
    description: string;
}

@Table({ tableName: 'equipment' })
export class Equipment extends Model<Equipment, EquipmentCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    is_active: string;

    @HasMany(() => Order)
    order: Order;
}
