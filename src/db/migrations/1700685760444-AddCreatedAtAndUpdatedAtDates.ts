import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtAndUpdatedAtDates1700685760444 implements MigrationInterface {
    name = 'AddCreatedAtAndUpdatedAtDates1700685760444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "expense_groups" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "expense_groups" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "expense_categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "expense_categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "expense_categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "expense_groups" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "expense_groups" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    }

}
