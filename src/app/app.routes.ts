import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { PendingsComponent } from './pages/pendings/pendings.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterAttendanceComponent } from './pages/register-attendance/register-attendance.component';
import { BookingHistoryComponent } from './pages/booking-history/booking-history.component';
import { StudentsComponent } from './pages/students/students.component';

export const routes: Routes = [
  {
    path: '',
    title: 'U Power',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'booking',
        pathMatch: 'full',
      },
      {
        path: 'booking',
        title: 'Reservar',
        component: BookingComponent,
      },
      {
        path: 'my-bookings',
        title: 'Mis reservas',
        component: MyBookingsComponent,
      },
      {
        path: 'pendings',
        title: 'Reservas pendientes',
        component: PendingsComponent,
      },
      {
        path: 'profile',
        title: 'Mi perfil',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'register-attendance',
        pathMatch: 'full',
      },
      {
        path: 'register-attendance',
        title: 'Registrar asistencia',
        component: RegisterAttendanceComponent,
      },
      {
        path: 'booking-history',
        title: 'Historial de reservas',
        component: BookingHistoryComponent,
      },
      {
        path: 'students',
        title: 'Estudiantes',
        component: StudentsComponent,
      },
      {
        path: 'profile',
        title: 'Mi perfil',
        component: ProfileComponent,
      },
    ]
  }
];
