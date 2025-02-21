import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service'; // Update with the correct path
import { map, catchError } from 'rxjs/operators';

export const authGuardGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Call the checkSession method from the AuthService to check if the session is valid
  return authService.checkSession().pipe(
    map((response) => {
      if (response?.valid) {
        return true; 
      } else {
        return router.createUrlTree(['auth/login']);
      }
    }),
    catchError((error) => {
      console.error("Session check failed", error);
      return of(router.createUrlTree(['auth/login']));
    })
  );
};

export const roleGuard: CanMatchFn = (route, segments) => {
    const router = inject( Router );
    const authService = inject( AuthService );

    if (authService.isLoggedIn()) {
        return  (authService.getRole().toUpperCase() != "USER" )? true : false;
    }

	return false;
};