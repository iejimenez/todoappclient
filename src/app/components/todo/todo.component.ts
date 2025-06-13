import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  providers: [TodoService],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  todoForm!: FormGroup;
  editingTodo: Todo | null = null;
  submitted = false;

  constructor(
    private store: Store<{ todos: TodoState }>,
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectTodoLoading);
    this.error$ = this.store.select(selectTodoError);
    this.initForm();
  }

  ngOnInit() {
    console.log('Component initialized, dispatching loadTodos');
    this.store.dispatch(TodoActions.loadTodos());
  }

  private initForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      expirationDate: ['', [Validators.required]],
      status: ['Pendiente', [Validators.required]]
    });
  }

  addTodo(): void {
    this.submitted = true;
    
    if (this.todoForm.valid) {
      const todo: Todo = {
        ...this.todoForm.value,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };
      this.store.dispatch(TodoActions.addTodo({ todo }));
      this.resetForm();
    } else {
      this.validateAllFormFields(this.todoForm);
    }
  }

  editTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
    this.todoForm.patchValue(todo);
    this.submitted = false;
  }

  saveEdit(): void {
    this.submitted = true;
    
    if (this.editingTodo && this.todoForm.valid) {
      const updatedTodo = {
        ...this.editingTodo,
        ...this.todoForm.value
      };
      this.store.dispatch(TodoActions.editTodo({ todo: updatedTodo }));
      this.cancelEdit();
    } else {
      this.validateAllFormFields(this.todoForm);
    }
  }

  cancelEdit(): void {
    this.editingTodo = null;
    this.submitted = false;
    this.resetForm();
  }

  removeTodo(id: string): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  toggleTodo(id: string): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  private resetForm(): void {
    this.submitted = false;
    this.todoForm.reset({
      title: '',
      description: '',
      expirationDate: '',
      status: 'Pendiente'
    });
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched();
        control?.updateValueAndValidity();
      }
    });
  }

  // Getters para acceder a los controles del formulario
  get title() { return this.todoForm.get('title'); }
  get description() { return this.todoForm.get('description'); }
  get expirationDate() { return this.todoForm.get('expirationDate'); }
  get status() { return this.todoForm.get('status'); }
} 