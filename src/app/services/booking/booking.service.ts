import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingFullI, BookingI, CreateBookingI } from '../../interfaces/booking';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    };
  }

  getMyBookings(): Observable<BookingI[]> {
    return this._http.get<BookingI[]>(`${environment.API}/booking`, this.getHttpOptions());
  }

  getPendings(): Observable<BookingI[]> {
    return this._http.get<BookingI[]>(`${environment.API}/booking/pendings`, this.getHttpOptions());
  }

  attended(id: string): Observable<BookingI> {
    return this._http.patch<BookingI>(`${environment.API}/booking/attended/${id}`, {}, this.getHttpOptions());
  }

  noAttended(id: string): Observable<BookingI> {
    return this._http.patch<BookingI>(`${environment.API}/booking/no-attended/${id}`, {}, this.getHttpOptions());
  }

  historyByUser(id: string): Observable<BookingI[]> {
    return this._http.get<BookingI[]>(`${environment.API}/booking/history/user/${id}`, this.getHttpOptions());
  }

  cancel(id: string): Observable<BookingI> {
    return this._http.patch<BookingI>(`${environment.API}/booking/cancel/${id}`, {}, this.getHttpOptions());
  }

  verify(createBooking: CreateBookingI): Observable<any> {
    return this._http.post<any>(`${environment.API}/booking/verify`, createBooking, this.getHttpOptions());
  }

  create(createBooking: CreateBookingI): Observable<BookingI> {
    return this._http.post<BookingI>(`${environment.API}/booking`, createBooking, this.getHttpOptions());
  }

  registerAttendance(createBooking: CreateBookingI): Observable<BookingFullI[]> {
    return this._http.post<BookingFullI[]>(`${environment.API}/booking/register-attendance`, createBooking, this.getHttpOptions());
  }

  history(createBooking: CreateBookingI): Observable<BookingFullI[]> {
    return this._http.post<BookingFullI[]>(`${environment.API}/booking/history`, createBooking, this.getHttpOptions());
  }
}
