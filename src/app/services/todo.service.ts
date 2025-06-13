import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/TodoTask');
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/api/TodoTask', todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`/api/TodoTask/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`/api/TodoTask/${id}`);
  }

  toggleTodo(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`/api/TodoTask/${id}/toggle`, {});
  }
} 