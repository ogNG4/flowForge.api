import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'application', name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ name: 'password', length: 400, nullable: true })
    password: string;

    @Column({ name: 'salt', length: 400, nullable: true })
    salt: string;

    @Column({ name: 'first_name', length: 255, nullable: true })
    firstName: string;

    @Column({ name: 'last_name', length: 255, nullable: true })
    lastName: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}
