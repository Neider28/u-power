import { Component, OnInit, inject } from '@angular/core';
import { MenuWrapComponent } from '../../components/menu-wrap/menu-wrap.component';
import { RouterOutlet } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { GoogleService } from '../../services/google/google.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuWrapComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private googleService = inject(GoogleService);
  private userService = inject(UserService);
  private router = inject(Router);

  async ngOnInit() {
    try {
      const googleToken = this.authService.getGoogleToken();

      if (!googleToken) {
        this.authService.logout();
        return;
      }

      this.authService.authStatusSubject.next(true);

      // Intentar obtener el JWT del backend
      const response = await firstValueFrom(
        this.googleService.loginGoogle({ token: googleToken })
      );

      if (response && response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        this.userService.loadUserProfile();

        const info: any = jwtDecode.jwtDecode(response.access_token);
        if (info?.role === 'admin') {
          this.router.navigate(['/admin']);
        }
      } else {
        this.authService.logout();
      }
    } catch (error) {
      this.authService.logout();
    }
  }
}
