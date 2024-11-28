import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { OrganizationMemberRepository } from '../repositories';
import { OrganizationMemberInputDto } from '../types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../authUserData/db';
import { Repository } from 'typeorm';
import { OrganizationMemberEntity } from '../db';

@Injectable()
export class OrganizationMemberService {
    constructor(
        private readonly organizationMemberRepo: OrganizationMemberRepository,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
    ) {}

    async getOrganizationMembers(organizationId: string) {
        const members = await this.organizationMemberRepo.findAllByOrganizationId(organizationId);
        return members.map((member) => ({
            id: member.userId,
            email: member.user.email,
            firstName: member.user.firstName,
            lastName: member.user.lastName,
            joinedAt: member.createdAt,
            role: member.role,
        }));
    }

    async addMember(organizationId: string, payload: OrganizationMemberInputDto) {
        const memberExists = await this.organizationMemberRepo.findOneByEmailAndOrganizationId(
            payload.email,
            organizationId
        );

        const user = await this.userRepo.findOneBy({ email: payload.email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (memberExists) {
            throw new ConflictException('Member already exists');
        }

        const member = new OrganizationMemberEntity();
        member.organizationId = organizationId;
        member.userId = user.id;
        member.role = payload.role;
        member.user = user;

        return await this.organizationMemberRepo.create(member);
    }
}
