import { inject } from '@angular/core';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

export const adminGuard = () => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  if (!token) {
    router.navigate(['/']);
    return false;
  }

  try {
    const info: any = jwtDecode.jwtDecode(token);
    if (info?.role === 'admin') {
      return true;
    }
  } catch (error) {
    console.error('Error al decodificar token:', error);
  }

  router.navigate(['/dashboard']);
  return false;
};
