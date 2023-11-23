import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenFieldToUser1700753540001
  implements MigrationInterface
{
  name = 'AddRefreshTokenFieldToUser1700753540001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
