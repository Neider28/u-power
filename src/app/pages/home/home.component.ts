import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/atoms/Button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  faArrowRight = faArrowRight;
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signInWithGoogle(): void {
    this.authService.login();
  }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
