import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../../services/booking/booking.service';
import { DatePipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '../../components/atoms/Button/button.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-register-attendance',
  standalone: true,
  imports: [
    DatePipe,
    FontAwesomeModule,
    DatePipe,
    TableModule,
    ImageModule,
    ButtonComponent,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './register-attendance.component.html',
  styleUrl: './register-attendance.component.css'
})
export class RegisterAttendanceComponent {
  constructor(
    private bookingService: BookingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  loading: boolean = false;

  now = new Date();
  defaultDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 6, 0);
  minDate!: Date;
  maxDate!: Date;

  formGroup = new FormGroup({
    startDate: new FormControl<Date>(this.defaultDate, Validators.required),
  });

  faClock = faClock;
  faTrash = faTrash;
  bookings: any[] = [];

  ngOnInit(): void {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 23, 59, 59, 999);
  }

  attended(id: string) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que el estudiante asistió?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      acceptLabel: 'Si',
      accept: () => {
        this.bookingService.attended(id).subscribe({
          next: () => {
            this.bookings = this.bookings.filter((booking) => booking.idBooking !== id);
            this.messageService.add({
              severity: 'success',
              summary: 'La asistencia fue confirmada con éxito',
              closable: false,
              life: 5000,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: '¡Ocurrió un error!',
              detail: 'Error interno del servidor',
              closable: false,
              life: 5000,
            });
          },
        });
      },
      key: 'cancelarDialog',
    });
  }

  noAttended(id: string) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que el estudiante NO asistió?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      acceptLabel: 'Si',
      accept: () => {
        this.bookingService.noAttended(id).subscribe({
          next: () => {
            this.bookings = this.bookings.filter((booking) => booking.idBooking !== id);
            this.messageService.add({
              severity: 'success',
              summary: 'La inasistencia fue confirmada con éxito',
              closable: false,
              life: 5000,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: '¡Ocurrió un error!',
              detail: 'Error interno del servidor',
              closable: false,
              life: 5000,
            });
          },
        });
      },
      key: 'cancelarDialog',
    });
  }

  filterTable(dt2: Table, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    dt2.filterGlobal(inputElement.value, 'contains');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loading = true;
      const startDate = this.formGroup.value.startDate;

      if (startDate) {
        this.bookingService.registerAttendance({
          startDate,
        }).subscribe({
          next: (value) => {
            this.bookings = value.map((item) => {
              return {
                name: item.user.name,
                picture: item.user.picture,
                email: item.user.email,
                id: item.user.googleId,
                idStudent: item.user.personalId,
                idBooking: item._id,
              };
            });
            this.loading = false;
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: '¡Ocurrió un error!',
              detail: 'Error interno del servidor',
              closable: false,
              life: 5000,
            });
            this.loading = false;
          },
        });
      }
    }
  }
}
