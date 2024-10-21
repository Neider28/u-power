import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { GoogleUserI } from '../../interfaces/GoogleUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { GoogleService } from '../google/google.service';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.oAuthService.hasValidAccessToken());
  public authStatus$: Observable<boolean> = this.authStatusSubject.asObservable();

  constructor(
    private oAuthService: OAuthService,
    private googleService: GoogleService,
    private router: Router,
  ) {
    this.initConfiguration();
  }

  initConfiguration(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '486770348215-03d3fmdob795mihss7ds0jus23ru0vd7.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email',
    };

    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.authStatusSubject.next(true);
        this.googleService.loginGoogle({
          token: this.oAuthService.getIdToken(),
        }).subscribe({
          next: (data) => {
            localStorage.setItem("access_token", data.access_token);

            const info: any = jwtDecode.jwtDecode(data.access_token);

            if (info && info?.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
        });
      }
    });
  }

  login(): void {
    this.oAuthService.initImplicitFlow();
  }

  logout(): void {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.authStatusSubject.next(false);
    localStorage.removeItem("access_token");
  }

  getProfile(): GoogleUserI | null {
    const claims = this.oAuthService.getIdentityClaims();

    if (claims) {
      return claims as GoogleUserI;
    }

    return null;
  }

  getToken(): string {
    return this.oAuthService.getAccessToken();
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
}
