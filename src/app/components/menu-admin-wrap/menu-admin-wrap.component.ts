import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from '../../services/auth/auth.service';
import { filter, Subscription } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClockRotateLeft, faClipboardUser, faChevronDown, faGraduationCap, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-admin-wrap',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkActive, RouterLink, ConfirmDialogModule, ButtonModule],
  providers: [ConfirmationService],
  templateUrl: './menu-admin-wrap.component.html',
  styleUrl: './menu-admin-wrap.component.css'
})
export class MenuAdminWrapComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {}

  private routeSubscription!: Subscription;
  buttonText!: string;
  buttonIcon!: IconDefinition;

  faClipboardUser = faClipboardUser;
  faClockRotateLeft = faClockRotateLeft;
  faGraduationCap = faGraduationCap;
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
        this.buttonIcon = faClipboardUser;
        break;
      case '/dashboard/my-bookings':
        this.buttonText = 'Mis reservas';
        this.buttonIcon = faClockRotateLeft;
        break;
      case '/dashboard/pendings':
        this.buttonText = 'Pendientes';
        this.buttonIcon = faGraduationCap;
        break;
      case '/dashboard/profile':
        this.buttonText = 'Perfil';
        this.buttonIcon = faUser;
        break;
      default:
        this.buttonText = 'Reservar';
        this.buttonIcon = faClipboardUser;
        break;
    }
  }
}
