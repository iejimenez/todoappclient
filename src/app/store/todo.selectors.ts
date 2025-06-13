import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectTodoLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectTodoError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
); 