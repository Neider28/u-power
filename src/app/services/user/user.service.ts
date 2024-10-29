import { Injectable } from '@angular/core';
import { UserI } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleService } from '../google/google.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUser: UserI = {
    sub: '',
    googleId: '',
    email: 'example@example.com',
    personalId: '',
    status: '',
    name: 'Default',
    picture: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
    _id: '',
  };

  constructor(
    private _http: HttpClient,
    private googleService: GoogleService,
    private authService: AuthService,
  ) { }

  private userSubject = new BehaviorSubject<UserI>(this.defaultUser);
  public user$ = this.userSubject.asObservable();

  private getHttpOptions() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };
  }

  getStudents(): Observable<UserI[]> {
    return this._http.get<UserI[]>(`${environment.API}/user`, this.getHttpOptions());
  }

  loadUserProfile(): void {
    this.googleService.profile().subscribe({
      next: (user) => {
        this.userSubject.next(user);
      },
      error: (error) => {
        console.error('Error al cargar perfil:', error);
        this.authService.logout();
      }
    });
  }

  getCurrentUser(): UserI {
    return this.userSubject.getValue();
  }
}
