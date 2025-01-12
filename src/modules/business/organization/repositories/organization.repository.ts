import { Injectable } from '@nestjs/common';
import { Brackets, In, IsNull, Repository } from 'typeorm';
import { OrganizationEntity, OrganizationMemberEntity } from '../db';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationRepository {
    constructor(@InjectRepository(OrganizationEntity) private repository: Repository<OrganizationEntity>) {}

    async create(organization: OrganizationEntity): Promise<OrganizationEntity> {
        return this.repository.save(organization);
    }

    async findByName(name: string): Promise<OrganizationEntity | null> {
        return this.repository.findOne({ where: { name, deletedAt: IsNull() } });
    }
    async getAllByUserId(userId: string): Promise<OrganizationEntity[]> {
        return this.repository
            .createQueryBuilder('organization')
            .leftJoinAndSelect('organization.members', 'members')
            .leftJoinAndSelect('members.user', 'user')
            .where((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select('member.organizationId')
                    .from(OrganizationMemberEntity, 'member')
                    .where('member.userId = :userId')
                    .getQuery();
                return 'organization.id IN ' + subQuery;
            })
            .setParameter('userId', userId)
            .andWhere('organization.deletedAt IS NULL')
            .getMany();
    }
}
