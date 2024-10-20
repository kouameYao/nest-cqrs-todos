import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { TodoStatus } from '../../application/dto/todo-status.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'to-do' })
  status: TodoStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
