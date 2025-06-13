import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoState } from './store/todo.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoComponent, FormsModule],
  template: `
    <div class="app-container">
      <h1>Todo App</h1>
      <app-todo></app-todo>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ todos: TodoState }>) {
    console.log('AppComponent constructor called');
  }

  ngOnInit() {
    console.log('AppComponent initialized');
  }
}
