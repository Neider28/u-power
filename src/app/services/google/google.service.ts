import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenI, TokenI } from '../../interfaces/token';
import { environment } from '../../../environments/environment';
import { UpdateUserI, UserI } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private _http: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };
  }

  loginGoogle(token: TokenI): Observable<AccessTokenI> {
    return this._http.post<AccessTokenI>(`${environment.API}/auth/google`, token, this.getHttpOptions());
  }

  updatePersonalId(googleId: string, updateUser: UpdateUserI): Observable<UserI> {
    return this._http.patch<UserI>(`${environment.API}/user/${googleId}`, updateUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }),
    });
  }

  profile(): Observable<UserI> {
    return this._http.get<UserI>(`${environment.API}/auth/profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }),
    });
  }
}
