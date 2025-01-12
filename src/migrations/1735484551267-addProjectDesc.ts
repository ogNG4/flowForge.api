import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectDesc1735484551267 implements MigrationInterface {
    name = 'AddProjectDesc1735484551267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."projects" ADD "description" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."projects" DROP COLUMN "description"`);
    }

}
