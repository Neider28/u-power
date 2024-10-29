import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../atoms/Button/button.component';
import { UserI } from '../../interfaces/user';
import { NgOptimizedImage } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ButtonComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  private authStatusSubscription!: Subscription;
  private userSubscription!: Subscription;

  isLoggedIn = false;
  googleUser: UserI = this.userService.getCurrentUser();

  isVisible = false;
  isDesktopScren = false;

  faBars = faBars;

  ngOnInit(): void {
    this.onScreenSize();

    this.authStatusSubscription = this.authService.authStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.userSubscription = this.userService.user$.subscribe(user => {
      this.googleUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
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
