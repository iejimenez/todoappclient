import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import * as TodoActions from '../../store/todo.actions';
import { selectAllTodos, selectTodoLoading, selectTodoError } from '../../store/todo.selectors';
import { TodoService } from '../../services/todo.service';
import { TodoState } from '../../store/todo.reducer';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  providers: [TodoService],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  newTodo: Todo = {
    id: '',
    title: '',
    description: '',
    expirationDate: '',
    status: 'Pendiente',
    createdAt: new Date().toISOString()
  };
  editingTodo: Todo | null = null;

  constructor(
    private store: Store<{ todos: TodoState }>,
    private todoService: TodoService
  ) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectTodoLoading);
    this.error$ = this.store.select(selectTodoError);
  }

  ngOnInit() {
    console.log('Component initialized, dispatching loadTodos');
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(): void {
    if (this.newTodo.title.trim()) {
      const todo: Todo = {
        ...this.newTodo,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };
      this.store.dispatch(TodoActions.addTodo({ todo }));
      this.resetForm();
    }
  }

  editTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  saveEdit(): void {
    if (this.editingTodo && this.editingTodo.title.trim()) {
      this.store.dispatch(TodoActions.editTodo({ todo: this.editingTodo }));
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }

  removeTodo(id: string): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  toggleTodo(id: string): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  private resetForm(): void {
    this.newTodo = {
      id: '',
      title: '',
      description: '',
      expirationDate: new Date().toISOString(),
      status: 'Pendiente',
      createdAt: new Date().toISOString()
    };
  }
} 