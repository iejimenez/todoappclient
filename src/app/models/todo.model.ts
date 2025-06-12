export type TodoStatus = 'pendiente' | 'completada';

export interface Todo {
  id: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estado: TodoStatus;
  createdAt: Date;
} 