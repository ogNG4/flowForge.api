import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationInvitationEntity, OrganizationMemberEntity } from '.';
import { BaseEntity } from '~/entities';
import { ProjectEntity } from '../../project/db/project.entity';

@Entity({ schema: 'application', name: 'organizations' })
export class OrganizationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
    name: string;

    @OneToMany(() => OrganizationMemberEntity, (member) => member.organization)
    members: OrganizationMemberEntity[];

    @OneToMany(() => OrganizationInvitationEntity, (invitation) => invitation.organization)
    invitations: OrganizationInvitationEntity[];

    @ManyToOne(() => ProjectEntity, (project) => project.organization)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;
}
