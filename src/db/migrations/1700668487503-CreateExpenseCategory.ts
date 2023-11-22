import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExpenseCategory1700668487503 implements MigrationInterface {
    name = 'CreateExpenseCategory1700668487503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "color" character varying NOT NULL, "expenseGroupId" uuid, CONSTRAINT "PK_d0ef31e189d9523461215b62775" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "expense_categories" ADD CONSTRAINT "FK_02e42677b51f62dc07468a51547" FOREIGN KEY ("expenseGroupId") REFERENCES "expense_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_categories" DROP CONSTRAINT "FK_02e42677b51f62dc07468a51547"`);
        await queryRunner.query(`DROP TABLE "expense_categories"`);
    }

}
