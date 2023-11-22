import { Module } from '@nestjs/common';
import { ExpenseGroupsService } from './expense-groups.service';
import { ExpenseGroupsController } from './expense-groups.controller';

@Module({
  controllers: [ExpenseGroupsController],
  providers: [ExpenseGroupsService],
})
export class ExpenseGroupsModule {}
