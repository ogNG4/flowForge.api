import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @Column({ name: 'created_by', nullable: true })
    createdBy: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @Column({ name: 'deleted_at', nullable: true, type: 'timestamp' })
    deletedAt: Date | null;
}
