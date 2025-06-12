import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo, TodoStatus } from '../../models/todo.model';
import { addTodo, removeTodo, toggleTodo } from '../../store/todo.actions';
import { selectAllTodos } from '../../store/todo.selectors';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  newTodo = {
    titulo: '',
    descripcion: '',
    fechaVencimiento: new Date(),
    estado: 'pendiente' as TodoStatus
  };

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
  }

  ngOnInit(): void {}

  addTodo(): void {
    if (this.newTodo.titulo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        ...this.newTodo,
        createdAt: new Date()
      };
      this.store.dispatch(addTodo({ todo }));
      this.resetForm();
    }
  }

  removeTodo(id: number): void {
    this.store.dispatch(removeTodo({ id }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  private resetForm(): void {
    this.newTodo = {
      titulo: '',
      descripcion: '',
      fechaVencimiento: new Date(),
      estado: 'pendiente'
    };
  }
} 