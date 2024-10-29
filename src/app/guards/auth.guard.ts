import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const oAuthService = inject(OAuthService);
  const router = inject(Router);

  try {
    // Intentamos cargar el documento de descubrimiento y hacer login si hay un token
    await oAuthService.loadDiscoveryDocumentAndTryLogin();

    if (authService.isAuthenticated()) {
      return true;
    }

    router.navigate(['/']);
    return false;
  } catch (error) {
    router.navigate(['/']);
    return false;
  }
};
