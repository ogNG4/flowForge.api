import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskImprovements1732969118368 implements MigrationInterface {
    name = 'TaskImprovements1732969118368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD "priority" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD "code" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD "above_task_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP COLUMN "above_task_id"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP COLUMN "priority"`);
    }

}
