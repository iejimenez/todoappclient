import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { todoReducer } from './store/todo.reducer';
import { TodoEffects } from './store/todo.effects';
import { apiInterceptor } from './interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    )
  ]
};
