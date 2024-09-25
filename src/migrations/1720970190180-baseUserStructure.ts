import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseUserStructure1720970190180 implements MigrationInterface {
    name = 'BaseUserStructure1720970190180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(400), "salt" character varying(400), "first_name" character varying(255), "last_name" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application"."account_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expiration_date" TIMESTAMP, "token_type" character varying(255) NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "user_id" uuid, CONSTRAINT "PK_5e3640c493cc6206a44b885e6a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application"."account_tokens" ADD CONSTRAINT "FK_1b5fea09efc20c7f63c4a09b3d6" FOREIGN KEY ("user_id") REFERENCES "application"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."account_tokens" DROP CONSTRAINT "FK_1b5fea09efc20c7f63c4a09b3d6"`);
        await queryRunner.query(`DROP TABLE "application"."account_tokens"`);
        await queryRunner.query(`DROP TABLE "application"."users"`);
    }

}
