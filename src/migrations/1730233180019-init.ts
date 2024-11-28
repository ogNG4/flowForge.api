import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730233180019 implements MigrationInterface {
    name = 'Init1730233180019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application"."organizations" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_9b7ca6d30b94fef571cff876884" UNIQUE ("name"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application"."users" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(400), "salt" character varying(400), "first_name" character varying(255), "last_name" character varying(255), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application"."organization_members" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "organization_id" uuid NOT NULL, "user_id" uuid NOT NULL, "role" character varying(255) NOT NULL, CONSTRAINT "PK_f4812f00736e35131a65d6032da" PRIMARY KEY ("organization_id", "user_id"))`);
        await queryRunner.query(`CREATE TABLE "application"."organization_invitations" ("created_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "organization_id" uuid NOT NULL, "invitation_status" character varying(255) NOT NULL, CONSTRAINT "PK_f172f12b8a9ee6584b661f57e24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application"."organization_members" ADD CONSTRAINT "FK_7062a4fbd9bab22ffd918e5d3d9" FOREIGN KEY ("organization_id") REFERENCES "application"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."organization_members" ADD CONSTRAINT "FK_89bde91f78d36ca41e9515d91c6" FOREIGN KEY ("user_id") REFERENCES "application"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."organization_invitations" ADD CONSTRAINT "FK_7f88954e8d667a76ae3ced6f446" FOREIGN KEY ("organization_id") REFERENCES "application"."organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application"."organization_invitations" ADD CONSTRAINT "FK_5c9fbf470f9e64246f0f80d6139" FOREIGN KEY ("user_id") REFERENCES "application"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application"."organization_invitations" DROP CONSTRAINT "FK_5c9fbf470f9e64246f0f80d6139"`);
        await queryRunner.query(`ALTER TABLE "application"."organization_invitations" DROP CONSTRAINT "FK_7f88954e8d667a76ae3ced6f446"`);
        await queryRunner.query(`ALTER TABLE "application"."organization_members" DROP CONSTRAINT "FK_89bde91f78d36ca41e9515d91c6"`);
        await queryRunner.query(`ALTER TABLE "application"."organization_members" DROP CONSTRAINT "FK_7062a4fbd9bab22ffd918e5d3d9"`);
        await queryRunner.query(`DROP TABLE "application"."organization_invitations"`);
        await queryRunner.query(`DROP TABLE "application"."organization_members"`);
        await queryRunner.query(`DROP TABLE "application"."users"`);
        await queryRunner.query(`DROP TABLE "application"."organizations"`);
    }

}
