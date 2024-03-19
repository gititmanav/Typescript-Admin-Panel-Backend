import { Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, Table, AllowNull } from 'sequelize-typescript';
import User from './userModel';

@Table
class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    @Column({
        type: DataType.STRING
    })
    roleName!: String

    @HasMany(() => User, 'roleId') // 'roleId' is the foreign key in the User model
  users!: User[];
}

export default Role;