import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { Role } from "./role.model";


@Table({ tableName: 'user_role', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    role_id: number;
}
