import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { TodoStatus } from '../../models/todo-status.enum';
import * as TodoActions from '../../store/todo.actions';
import { selectAllTodos } from '../../store/todo.selectors';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  newTodo: Todo = {
    id: 0,
    titulo: '',
    descripcion: '',
    fechaVencimiento: new Date(),
    estado: TodoStatus.PENDIENTE,
    createdAt: new Date()
  };
  editingTodo: Todo | null = null;
  TodoStatus = TodoStatus;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(): void {
    if (this.newTodo.titulo.trim()) {
      const todo: Todo = {
        ...this.newTodo,
        id: Date.now(),
        createdAt: new Date()
      };
      this.store.dispatch(TodoActions.addTodo({ todo }));
      this.resetForm();
    }
  }

  editTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  saveEdit(): void {
    if (this.editingTodo && this.editingTodo.titulo.trim()) {
      this.store.dispatch(TodoActions.editTodo({ todo: this.editingTodo }));
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }

  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  private resetForm(): void {
    this.newTodo = {
      id: 0,
      titulo: '',
      descripcion: '',
      fechaVencimiento: new Date(),
      estado: TodoStatus.PENDIENTE,
      createdAt: new Date()
    };
  }
} 