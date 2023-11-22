import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExpenseGroup1700668115666 implements MigrationInterface {
    name = 'CreateExpenseGroup1700668115666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_777b1df7969a9a0ed6ae4406548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_groups_users_users" ("expenseGroupsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_57c1828aeeb9facaef4809670f4" PRIMARY KEY ("expenseGroupsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_410127800a502ddb35036505e0" ON "expense_groups_users_users" ("expenseGroupsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e467b2afa36267f97096577b7e" ON "expense_groups_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "expense_groups_users_users" ADD CONSTRAINT "FK_410127800a502ddb35036505e0c" FOREIGN KEY ("expenseGroupsId") REFERENCES "expense_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expense_groups_users_users" ADD CONSTRAINT "FK_e467b2afa36267f97096577b7e6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_groups_users_users" DROP CONSTRAINT "FK_e467b2afa36267f97096577b7e6"`);
        await queryRunner.query(`ALTER TABLE "expense_groups_users_users" DROP CONSTRAINT "FK_410127800a502ddb35036505e0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e467b2afa36267f97096577b7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_410127800a502ddb35036505e0"`);
        await queryRunner.query(`DROP TABLE "expense_groups_users_users"`);
        await queryRunner.query(`DROP TABLE "expense_groups"`);
    }

}
