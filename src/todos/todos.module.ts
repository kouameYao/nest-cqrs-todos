import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Todo } from '../domain/entities/todo.entity';
import { TodosSagas } from '../application/sagas/todos.sagas';
import { TodoRepository } from '../infrastructure/todo.repository';
import { NotifyUserHandler } from '../application/commands/handlers/notify-user.handler';
import {
  GetTodoByIdHandler,
  GetTodosHandler,
} from '../application/queries/handlers';
import {
  CreateTodoHandler,
  DeleteTodoHandler,
  UpdateTodoHandler,
} from '../application/commands/handlers';
import {
  TodoCompletedHandler,
  TodoCreatedHandler,
  TodoDeletedHandler,
} from '../domain/events/handlers';

const CommandHandlers = [
  CreateTodoHandler,
  UpdateTodoHandler,
  DeleteTodoHandler,
];
const QueryHandlers = [GetTodosHandler, GetTodoByIdHandler];
const EventHandlers = [
  TodoCreatedHandler,
  TodoCompletedHandler,
  TodoDeletedHandler,
  NotifyUserHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    TodoRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    TodosSagas,
  ],
})
export class TodosModule {}
