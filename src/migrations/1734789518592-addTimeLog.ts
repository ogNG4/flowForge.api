import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeLog1734789518592 implements MigrationInterface {
    name = 'AddTimeLog1734789518592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application"."task_time_logs" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_id" uuid NOT NULL, "user_id" uuid NOT NULL, "time_spent" integer NOT NULL, "log_date" date NOT NULL, "description" text, CONSTRAINT "PK_785b74bf0fb2dc79de82f73e7b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application"."task_time_logs" ADD CONSTRAINT "FK_1f2cded68df61f24f9e823e3f0a" FOREIGN KEY ("task_id") REFERENCES "application"."project_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."task_time_logs" ADD CONSTRAINT "FK_5c8becb4e62ef6a72ef35d91a32" FOREIGN KEY ("user_id") REFERENCES "application"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."task_time_logs" DROP CONSTRAINT "FK_5c8becb4e62ef6a72ef35d91a32"`);
        await queryRunner.query(`ALTER TABLE "application"."task_time_logs" DROP CONSTRAINT "FK_1f2cded68df61f24f9e823e3f0a"`);
        await queryRunner.query(`DROP TABLE "application"."task_time_logs"`);
    }

}
