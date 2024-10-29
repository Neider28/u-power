import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  public authStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.oAuthService.hasValidAccessToken());
  public authStatus$: Observable<boolean> = this.authStatusSubject.asObservable();


  constructor() {
    // Configuración inicial
    this.configureOAuth();
  }

  private async configureOAuth() {
    this.oAuthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin + '/dashboard',
      clientId: '486770348215-03d3fmdob795mihss7ds0jus23ru0vd7.apps.googleusercontent.com',
      scope: 'openid profile email',
      responseType: 'id_token token',
      showDebugInformation: true
    });

    try {
      await this.oAuthService.loadDiscoveryDocumentAndTryLogin();

      // Si tenemos token, configuramos el refresh
      if (this.oAuthService.hasValidIdToken()) {
        this.oAuthService.setupAutomaticSilentRefresh();
      }
    } catch (error) {
      console.error('Error en la configuración de OAuth:', error);
    }
  }

  async login() {
    try {
      await this.oAuthService.loadDiscoveryDocumentAndLogin();

      if (this.oAuthService.hasValidIdToken()) {
        return true;
      }

      return false;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  getGoogleToken(): string | null {
    return this.oAuthService.getIdToken();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.oAuthService.logOut(true);
    this.authStatusSubject.next(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.oAuthService.hasValidIdToken();
  }
}
