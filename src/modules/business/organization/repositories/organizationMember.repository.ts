import { Injectable } from '@nestjs/common';
import { Repository, IsNull } from 'typeorm';
import { OrganizationMemberEntity } from '../db';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationMemberRepository {
    constructor(@InjectRepository(OrganizationMemberEntity) private repository: Repository<OrganizationMemberEntity>) {}

    async create(organizationMember: OrganizationMemberEntity): Promise<OrganizationMemberEntity> {
        return this.repository.save(organizationMember);
    }

    async findOne(organizationId: string, userId: string): Promise<OrganizationMemberEntity | null> {
        return this.repository.findOne({
            where: {
                organizationId,
                userId,
                deletedAt: IsNull(),
            },
            relations: ['user'],
        });
    }

    async findOneByEmailAndOrganizationId(
        email: string,
        organizationId: string
    ): Promise<OrganizationMemberEntity | null> {
        return this.repository.findOne({
            where: { user: { email: email }, organizationId, deletedAt: IsNull() },
        });
    }

    async findAllByOrganizationId(organizationId: string): Promise<OrganizationMemberEntity[]> {
        return this.repository.find({
            where: {
                organizationId,
                deletedAt: IsNull(),
            },
            relations: ['user'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
}
