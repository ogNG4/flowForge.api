import { MigrationInterface, QueryRunner } from "typeorm";

export class EstiamtedTime1734796160508 implements MigrationInterface {
    name = 'EstiamtedTime1734796160508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD "estimated_time" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP COLUMN "estimated_time"`);
    }

}
