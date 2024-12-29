import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrgDescription1735483220439 implements MigrationInterface {
    name = 'AddOrgDescription1735483220439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."organizations" ADD "description" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."organizations" DROP COLUMN "description"`);
    }

}
