import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Todo } from '../domain/entities/todo.entity';
import { CreateTodoHandler } from '../application/commands/create-todo.command';
import { UpdateTodoHandler } from '../application/commands/update-todo.command';
import { DeleteTodoHandler } from '../application/commands/delete-todo.command';
import { GetTodosHandler } from '../application/queries/get-todos.query';
import { GetTodoByIdHandler } from '../application/queries/get-todo-by-id.query';
import { TodosSagas } from '../application/sagas/todos.sagas';
import {
  TodoCreatedHandler,
  TodoCompletedHandler,
  TodoDeletedHandler,
} from '../domain/events/todo-event-handlers';
import { TodoRepository } from '../infrastructure/todo.repository';

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
