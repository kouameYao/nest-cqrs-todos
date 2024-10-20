import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from './commands/create-todo.command';
import { UpdateTodoCommand } from './commands/update-todo.command';
import { DeleteTodoCommand } from './commands/delete-todo.command';
import { GetTodosQuery } from './queries/get-todos.query';
import { GetTodoByIdQuery } from './queries/get-todo-by-id.query';
import { TodoStatus } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getAllTodos(@Query('status') status: TodoStatus) {
    status = status || 'all';

    return this.queryBus.execute(new GetTodosQuery(status));
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number) {
    return this.queryBus.execute(new GetTodoByIdQuery(id));
  }

  @Post()
  async createTodo(@Body('title') title: string) {
    return this.commandBus.execute(new CreateTodoCommand(title));
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body('status') status: TodoStatus,
  ) {
    return this.commandBus.execute(new UpdateTodoCommand(id, status));
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
