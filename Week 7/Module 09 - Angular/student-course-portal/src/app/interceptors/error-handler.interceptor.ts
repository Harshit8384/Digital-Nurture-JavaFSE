import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized access (401) detected by error handler interceptor. Redirecting to home...');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server Error (500) detected by error handler interceptor.');
      }
      return throwError(() => error);
    })
  );
};
