import { ExpenseGroup } from 'src/expense-groups/expense-groups.entity';
import { Expense } from 'src/expenses/expenses.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expense_categories')
export class ExpenseCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @ManyToOne(() => ExpenseGroup, (expenseGroup) => expenseGroup.categories)
  expenseGroup: ExpenseGroup;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
