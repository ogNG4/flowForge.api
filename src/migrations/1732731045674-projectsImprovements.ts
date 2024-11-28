import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectsImprovements1732731045674 implements MigrationInterface {
    name = 'ProjectsImprovements1732731045674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD "order" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."projects" ADD "organization_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP CONSTRAINT "FK_6aa5ff4c733c42bd008f174ac61"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ALTER COLUMN "project_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD CONSTRAINT "FK_6aa5ff4c733c42bd008f174ac61" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP CONSTRAINT "FK_6aa5ff4c733c42bd008f174ac61"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ALTER COLUMN "project_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD CONSTRAINT "FK_6aa5ff4c733c42bd008f174ac61" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."projects" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP COLUMN "created_by"`);
    }

}
