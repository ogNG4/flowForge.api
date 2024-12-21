import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskImprovements21732971827720 implements MigrationInterface {
    name = 'TaskImprovements21732971827720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_68b008b46d5c9f1b49ae92b6f15"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_39586b9f58d2a9cd2bc60b457f4"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ALTER COLUMN "project_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ALTER COLUMN "column_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_68b008b46d5c9f1b49ae92b6f15" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_39586b9f58d2a9cd2bc60b457f4" FOREIGN KEY ("column_id") REFERENCES "application"."project_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_39586b9f58d2a9cd2bc60b457f4"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_68b008b46d5c9f1b49ae92b6f15"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ALTER COLUMN "column_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ALTER COLUMN "project_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_39586b9f58d2a9cd2bc60b457f4" FOREIGN KEY ("column_id") REFERENCES "application"."project_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_68b008b46d5c9f1b49ae92b6f15" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
