import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";
import { Role } from "src/role/models/role.model";
import { UserRole } from "src/role/models/user-role.model";

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    location: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttrs> {
    static getRoleByValue(arg0: string) {
        throw new Error('Method not implemented.');
    }
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    location: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_admin: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @HasMany(() => Order)
    order: Order;

    @BelongsToMany(() => Role, () => UserRole)
    role: Role[]
}
