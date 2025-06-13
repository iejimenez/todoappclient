import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/TodoTask';  // Cambiado a ruta relativa

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Service error:', error);
    return throwError(() => error);
  }

  getTodos(): Observable<Todo[]> {
    console.log('Service - Getting todos');
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap(todos => console.log('Service - Todos received:', todos)),
      catchError(this.handleError)
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    console.log('Service - Creating todo:', todo);
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap(newTodo => console.log('Service - Todo created:', newTodo)),
      catchError(this.handleError)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    console.log('Service - Updating todo:', todo);
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo).pipe(
      tap(updatedTodo => console.log('Service - Todo updated:', updatedTodo)),
      catchError(this.handleError)
    );
  }

  deleteTodo(id: string): Observable<void> {
    console.log('Service - Deleting todo:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Service - Todo deleted:', id)),
      catchError(this.handleError)
    );
  }

  toggleTodo(id: string): Observable<Todo> {
    console.log('Service - Toggling todo:', id);
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {}).pipe(
      tap(toggledTodo => console.log('Service - Todo toggled:', toggledTodo)),
      catchError(this.handleError)
    );
  }
} 