import { ExpenseCategory } from 'src/expense-categories/expense-categories.entity';
import { ExpenseGroup } from 'src/expense-groups/expense-groups.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  value: number;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @ManyToOne(() => ExpenseGroup, (expenseGroup) => expenseGroup.expenses)
  expenseGroup: ExpenseGroup;

  @ManyToOne(() => ExpenseCategory, (category) => category.expenses)
  category: ExpenseCategory;

  @Index()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
