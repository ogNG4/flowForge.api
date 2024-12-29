import { ConflictException, Injectable } from '@nestjs/common';
import { OrganizationMemberRepository, OrganizationRepository } from '../repositories';
import { CreateOrganizationInputDto } from '../types';
import { OrganizationEntity, OrganizationMemberEntity } from '../db';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { OrganizationMemberRole } from '~/types/domain';

@Injectable()
export class OrganizationService {
    constructor(
        private readonly organizationRepo: OrganizationRepository,
        private readonly organizationMemberRepo: OrganizationMemberRepository
    ) {}

    async createOrganization(payload: CreateOrganizationInputDto, user: CurrentUser) {
        const organizationExists = await this.organizationRepo.findByName(payload.name);
        if (organizationExists) throw new ConflictException('Organization already exists');

        const organization = new OrganizationEntity();
        organization.name = payload.name;
        organization.createdBy = user.id;
        organization.description = payload.description;

        const { id } = await this.organizationRepo.create(organization);
        await this.createOrganizationOwner(id, user.id);

        return { id };
    }

    async createOrganizationOwner(organizationId: string, userId: string) {
        const organizationMember = new OrganizationMemberEntity();
        organizationMember.organizationId = organizationId;
        organizationMember.userId = userId;
        organizationMember.role = OrganizationMemberRole.OWNER;

        return await this.organizationMemberRepo.create(organizationMember);
    }

    async getAllUserOrganizations(user: CurrentUser) {
        const organizations = await this.organizationRepo.getAllByUserId(user.id);

        return organizations.map((organization) => {
            const userMember = organization.members.find((member) => member.userId === user.id);
            const ownerMember = organization.members.find((member) => member.role === OrganizationMemberRole.OWNER);
            return {
                id: organization.id,
                name: organization.name,
                joinedAt: userMember?.createdAt,
                owner: ownerMember
                    ? {
                          id: ownerMember.userId,
                          name: `${ownerMember.user.firstName} ${ownerMember.user.lastName}`.trim(),
                      }
                    : null,
            };
        });
    }
}
