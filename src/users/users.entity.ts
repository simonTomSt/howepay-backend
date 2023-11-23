import { ExpenseGroup } from 'src/expense-groups/expense-groups.entity';
import { Expense } from 'src/expenses/expenses.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  refreshToken: string;

  @ManyToMany(() => ExpenseGroup)
  expenseGroups: ExpenseGroup[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
