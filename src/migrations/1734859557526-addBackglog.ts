import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBackglog1734859557526 implements MigrationInterface {
    name = 'AddBackglog1734859557526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD "is_backlog" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP COLUMN "is_backlog"`);
    }

}
