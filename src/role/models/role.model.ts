import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { UserRole } from "./user-role.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleCreationAttrs> {
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
        unique: true
    })
    value: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    user: User[];
}
