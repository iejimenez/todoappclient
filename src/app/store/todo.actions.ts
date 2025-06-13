import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

// Add Todo
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: any }>()
);

// Edit Todo
export const editTodo = createAction(
  '[Todo] Edit Todo',
  props<{ todo: Todo }>()
);
export const editTodoSuccess = createAction(
  '[Todo] Edit Todo Success',
  props<{ todo: Todo }>()
);
export const editTodoFailure = createAction(
  '[Todo] Edit Todo Failure',
  props<{ error: any }>()
);

// Remove Todo
export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: string }>()
);
export const removeTodoSuccess = createAction(
  '[Todo] Remove Todo Success',
  props<{ id: string }>()
);
export const removeTodoFailure = createAction(
  '[Todo] Remove Todo Failure',
  props<{ error: any }>()
);

// Toggle Todo
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: string }>()
);
export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ todo: Todo }>()
);
export const toggleTodoFailure = createAction(
  '[Todo] Toggle Todo Failure',
  props<{ error: any }>()
); 