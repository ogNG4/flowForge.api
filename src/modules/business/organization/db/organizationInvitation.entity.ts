import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationEntity } from '.';
import { BaseEntity } from '~/entities';
import { UserEntity } from '../../authUserData/db';
import { InvitationStatus } from '~/types/domain';

@Entity({ schema: 'application', name: 'organization_invitations' })
export class OrganizationInvitationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @Column({ name: 'organization_id', type: 'uuid' })
    organizationId: string;

    @Column({ name: 'invitation_status', type: 'varchar', length: 255 })
    invitationStatus: InvitationStatus;

    @ManyToOne(() => OrganizationEntity, (organization) => organization.members)
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity;

    @ManyToOne(() => UserEntity, (user) => user.organizationInvitations)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
