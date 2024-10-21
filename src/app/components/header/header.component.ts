import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { GoogleUserI } from '../../interfaces/GoogleUser';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../atoms/Button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  private authStatusSubscription!: Subscription;

  isLoggedIn = false;
  googleUser: GoogleUserI | null = null;

  isVisible = false;
  isDesktopScren = false;

  faBars = faBars;

  ngOnInit(): void {
    this.onScreenSize();

    this.authStatusSubscription = this.authService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.googleUser = this.authService.getProfile();
      } else {
        this.googleUser = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }

  toggleNav(): void {
    this.isVisible = !this.isVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.onScreenSize();
  }

  onScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      this.isDesktopScren = false;
    } else {
      this.isDesktopScren = true;
    }
  }

  signInWithGoogle(): void {
    this.authService.login();
  }
}
