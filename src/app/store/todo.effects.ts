import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      tap(() => console.log('Loading todos...')),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          tap(todos => console.log('Todos loaded:', todos)),
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(error => {
            console.error('Error loading todos:', error);
            return of(TodoActions.loadTodosFailure({ error }));
          })
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap(({ todo }) =>
        this.todoService.createTodo(todo).pipe(
          map(newTodo => TodoActions.addTodoSuccess({ todo: newTodo })),
          catchError(error => of(TodoActions.addTodoFailure({ error })))
        )
      )
    )
  );

  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.editTodo),
      mergeMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map(updatedTodo => TodoActions.editTodoSuccess({ todo: updatedTodo })),
          catchError(error => of(TodoActions.editTodoFailure({ error })))
        )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodo),
      mergeMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => TodoActions.removeTodoSuccess({ id })),
          catchError(error => of(TodoActions.removeTodoFailure({ error })))
        )
      )
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      mergeMap(({ id }) =>
        this.todoService.toggleTodo(id).pipe(
          map(updatedTodo => TodoActions.toggleTodoSuccess({ todo: updatedTodo })),
          catchError(error => of(TodoActions.toggleTodoFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
} 