import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Equipment } from "src/equipment/models/equipment.model";
import { User } from "src/user/models/user.model";

interface OrderCreationAttrs {
    equipment_id: number;
    user_id: number;
    order_date: Date;
    amount: number;
    total_price: number
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    id: number;

    @ForeignKey(() => Equipment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    equipment_id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    order_date: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    amount: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    total_price: number;

    @BelongsTo(() => Equipment)
    equipment: Equipment[];

    @BelongsTo(() => User)
    user: User[];
}
