import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // URL base de la API
  const apiUrl = 'https://todoappapi-690260275830.northamerica-northeast2.run.app/';

  console.log('Interceptor - Original request:', {
    url: req.url,
    method: req.method,
    headers: req.headers.keys()
  });

  // Si la URL comienza con /api, le agregamos la URL base
  if (req.url.startsWith('/api')) {
    const modifiedReq = req.clone({
      url: `${apiUrl}${req.url}`
    });

    console.log('Interceptor - Modified request:', {
      url: modifiedReq.url,
      method: modifiedReq.method,
      headers: modifiedReq.headers.keys()
    });

    return next(modifiedReq).pipe(
      tap({
        next: (response) => console.log('Interceptor - Response:', response),
        error: (error) => console.error('Interceptor - Error:', error)
      })
    );
  }

  return next(req);
}; 