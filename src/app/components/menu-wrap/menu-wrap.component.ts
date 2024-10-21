import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faBookmark, faClock, faUser, faRightFromBracket, faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription, filter } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-menu-wrap',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkActive, RouterLink, ConfirmDialogModule, ButtonModule],
  providers: [ConfirmationService],
  templateUrl: './menu-wrap.component.html',
  styleUrl: './menu-wrap.component.css'
})
export class MenuWrapComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {}

  private routeSubscription!: Subscription;
  buttonText!: string;
  buttonIcon!: IconDefinition;

  faCalendarDays = faCalendarDays;
  faBookmark = faBookmark;
  faClock = faClock;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faChevronDown = faChevronDown;

  isCollapse = false;

  ngOnInit(): void {
    this.updateButtonText(this.router.url);

    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateButtonText(this.router.url);
        this.isCollapse = false;
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  logOut(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas cerrar sesión?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      acceptLabel: 'Si',
      accept: () => {
        this.authService.logout();
        this.router.navigate(['/']);
      },
      key: 'logOutDialog',
    });
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  private updateButtonText(url: string): void {
    switch (url) {
      case '/dashboard/booking':
        this.buttonText = 'Reservar';
        this.buttonIcon = faCalendarDays;
        break;
      case '/dashboard/my-bookings':
        this.buttonText = 'Mis reservas';
        this.buttonIcon = faBookmark;
        break;
      case '/dashboard/pendings':
        this.buttonText = 'Pendientes';
        this.buttonIcon = faClock;
        break;
      case '/dashboard/profile':
        this.buttonText = 'Perfil';
        this.buttonIcon = faUser;
        break;
      default:
        this.buttonText = 'Reservar';
        this.buttonIcon = faCalendarDays;
        break;
    }
  }
}
