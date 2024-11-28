import { MigrationInterface, QueryRunner } from "typeorm";

export class Projects1732729185415 implements MigrationInterface {
    name = 'Projects1732729185415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application"."project_tasks" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "content" text NOT NULL, "assigned_user_id" uuid, "project_id" uuid, "column_id" uuid, CONSTRAINT "PK_b1b6204912a6f44133df3a4518b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application"."projects" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "code" character varying(255) NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application"."project_columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "project_id" uuid, CONSTRAINT "PK_e1807cd19be86e3e762fe74b94d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application"."organizations" ADD "project_id" uuid`);
        await queryRunner.query(`ALTER TABLE "application"."organizations" ADD CONSTRAINT "FK_c5a26f947fdf5516107c0f9996a" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_2ef29f1c43c338f586a7fdfde6c" FOREIGN KEY ("assigned_user_id") REFERENCES "application"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_68b008b46d5c9f1b49ae92b6f15" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_39586b9f58d2a9cd2bc60b457f4" FOREIGN KEY ("column_id") REFERENCES "application"."project_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_columns" ADD CONSTRAINT "FK_6aa5ff4c733c42bd008f174ac61" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_columns" DROP CONSTRAINT "FK_6aa5ff4c733c42bd008f174ac61"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_39586b9f58d2a9cd2bc60b457f4"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_68b008b46d5c9f1b49ae92b6f15"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_2ef29f1c43c338f586a7fdfde6c"`);
        await queryRunner.query(`ALTER TABLE "application"."organizations" DROP CONSTRAINT "FK_c5a26f947fdf5516107c0f9996a"`);
        await queryRunner.query(`ALTER TABLE "application"."organizations" DROP COLUMN "project_id"`);
        await queryRunner.query(`DROP TABLE "application"."project_columns"`);
        await queryRunner.query(`DROP TABLE "application"."projects"`);
        await queryRunner.query(`DROP TABLE "application"."project_tasks"`);
    }

}
