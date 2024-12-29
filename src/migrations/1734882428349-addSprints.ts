import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSprints1734882428349 implements MigrationInterface {
    name = 'AddSprints1734882428349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application"."project_sprints" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "goal" text NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "project_id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d5890ebf9be7d182f1d88369e7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD "sprint_id" uuid`);
        await queryRunner.query(`ALTER TABLE "application"."project_sprints" ADD CONSTRAINT "FK_d898d46cfe5a687dc43bc7736e1" FOREIGN KEY ("project_id") REFERENCES "application"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" ADD CONSTRAINT "FK_9befc3927d4739173498e50e589" FOREIGN KEY ("sprint_id") REFERENCES "application"."project_sprints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP CONSTRAINT "FK_9befc3927d4739173498e50e589"`);
        await queryRunner.query(`ALTER TABLE "application"."project_sprints" DROP CONSTRAINT "FK_d898d46cfe5a687dc43bc7736e1"`);
        await queryRunner.query(`ALTER TABLE "application"."project_tasks" DROP COLUMN "sprint_id"`);
        await queryRunner.query(`DROP TABLE "application"."project_sprints"`);
    }

}
