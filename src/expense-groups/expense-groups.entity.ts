import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { Expense } from 'src/expenses/expenses.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expense_groups')
export class ExpenseGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => ExpenseCategory, (category) => category.expenseGroup)
  categories: ExpenseCategory[];

  @OneToMany(() => Expense, (expense) => expense.expenseGroup)
  expenses: Expense[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
