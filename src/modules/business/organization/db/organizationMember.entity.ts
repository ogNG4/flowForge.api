import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrganizationEntity } from '.';
import { UserEntity } from '../../authUserData/db';
import { OrganizationMemberRole } from '../../../../types/domain';
import { BaseEntity } from '~/entities';

@Entity({ schema: 'application', name: 'organization_members' })
export class OrganizationMemberEntity extends BaseEntity {
    @PrimaryColumn({ name: 'organization_id', type: 'uuid' })
    organizationId: string;

    @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: string;

    @Column({ name: 'role', type: 'varchar', length: 255 })
    role: OrganizationMemberRole;

    @ManyToOne(() => OrganizationEntity, (organization) => organization.members)
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity;

    @ManyToOne(() => UserEntity, (user) => user.organizations)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
