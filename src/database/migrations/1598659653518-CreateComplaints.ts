import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateComplaints1598659653518
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'complaints',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'whistleblower_id',
            type: 'varchar',
          },
          {
            name: 'address_id',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'complaints',
      new TableForeignKey({
        columnNames: ['whistleblower_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'whistleblowers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'complaints',
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'adresses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('complaints');
  }
}
