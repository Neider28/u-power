import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { GoogleUserI } from '../../interfaces/GoogleUser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleService } from '../../services/google/google.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '../../components/atoms/Button/button.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(
    private authService: AuthService,
    private googleService: GoogleService,
    private messageService: MessageService,
  ) {}

  loading: boolean = false;
  googleUser!: GoogleUserI | null;

  profileForm = new FormGroup({
    id: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.googleUser = this.authService.getProfile();
    this.googleService.profile().subscribe({
      next: (data) => {
        this.profileForm.setValue({
          id: data.personalId || '',
        });
      },
      error: () => {
        this.profileForm.setValue({
          id: '',
        });
      }
    });
  }

  onSubmit() {
    if (this.googleUser && this.profileForm.value.id) {
      this.loading = true;
      this.googleService.updatePersonalId(this.googleUser?.sub, {
        personalId: this.profileForm.value.id,
      }).subscribe({
        next: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: '¡Perfil actualizado!',
            detail: 'Tú perfil ha sido actualizado satisfactoriamente',
            closable: false,
            life: 5000,
          });
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: '¡Ocurrió un error!',
            detail: 'El ID ingresado ya está en uso por otro usuario',
            closable: false,
            life: 5000,
          });
        },
      });
    }
  }
}
