import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { TodoStatus } from '../models/todo-status.enum';
import * as TodoActions from './todo.actions';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  // Load Todos
  on(TodoActions.loadTodos, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    error: null
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Todo
  on(TodoActions.addTodo, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    error: null
  })),
  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Edit Todo
  on(TodoActions.editTodo, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.editTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
    loading: false,
    error: null
  })),
  on(TodoActions.editTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Remove Todo
  on(TodoActions.removeTodo, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.removeTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
    loading: false,
    error: null
  })),
  on(TodoActions.removeTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Toggle Todo
  on(TodoActions.toggleTodo, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.toggleTodoSuccess, (state, { todo }) => {
    if (!todo) return state;
    return {
      ...state,
      todos: state.todos.map(t => t.id === todo.id ? todo : t),
      loading: false,
      error: null
    };
  }),
  on(TodoActions.toggleTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
); 