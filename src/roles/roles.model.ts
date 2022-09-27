import { UserEntity } from './../users/users.model';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEntity } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description?: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class RoleEntity extends Model<RoleEntity, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'user id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'This role has all permissions',
    description: 'Description this role',
  })
  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => UserEntity, () => UserRolesEntity)
  users: UserEntity[];
}
