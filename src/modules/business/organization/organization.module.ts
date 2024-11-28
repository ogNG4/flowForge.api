import { Module } from '@nestjs/common';
import { OrganizationController, OrganizationMemberController } from './controllers';
import { OrganizationService } from './services/organization.service';
import { OrganizationEntity, OrganizationMemberEntity } from './db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationMemberRepository, OrganizationRepository } from './repositories';
import { OrganizationMemberService } from './services';
import { UserEntity } from '../authUserData/db';
@Module({
    imports: [TypeOrmModule.forFeature([OrganizationEntity, OrganizationMemberEntity, UserEntity])],
    providers: [OrganizationService, OrganizationRepository, OrganizationMemberRepository, OrganizationMemberService],
    controllers: [OrganizationController, OrganizationMemberController],
})
export class OrganizationModule {}
