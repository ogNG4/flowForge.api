import { Injectable } from '@nestjs/common';
import { Brackets, IsNull, Repository } from 'typeorm';
import { OrganizationEntity } from '../db';
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
            .leftJoinAndSelect('organization.members', 'member')
            .leftJoinAndSelect('member.user', 'user')
            .where(
                new Brackets((qb) => {
                    qb.where('member.userId = :userId', { userId }).orWhere('member.role = :ownerRole', {
                        ownerRole: 'OWNER',
                    });
                })
            )
            .andWhere('organization.deletedAt IS NULL')
            .andWhere('member.deletedAt IS NULL')
            .select(['organization', 'member', 'user'])
            .getMany();
    }
}
