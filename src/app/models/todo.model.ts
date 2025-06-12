import { TodoStatus } from './todo-status.enum';

export interface Todo {
  id: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estado: TodoStatus;
  createdAt: Date;
} 