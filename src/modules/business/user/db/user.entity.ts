import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'application', name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
