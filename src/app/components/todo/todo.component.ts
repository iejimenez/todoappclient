import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
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
  newTodoTitle: string = '';

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
  }

  ngOnInit(): void {}

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle,
        completed: false,
        createdAt: new Date()
      };
      this.store.dispatch(addTodo({ todo }));
      this.newTodoTitle = '';
    }
  }

  removeTodo(id: number): void {
    this.store.dispatch(removeTodo({ id }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }
} 