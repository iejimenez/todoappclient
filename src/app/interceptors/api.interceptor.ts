import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // URL base de la API
  const apiUrl = 'https://localhost:7067';

  // Si la URL comienza con /api, le agregamos la URL base
  if (req.url.startsWith('/api')) {
    req = req.clone({
      url: `${apiUrl}${req.url}`
    });
  }

  return next(req);
}; 