import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = (state: any) => state.todos;

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
); 