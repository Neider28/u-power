import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../components/modal/modal.component';
import { PanelModule } from 'primeng/panel';
import { StepperModule } from 'primeng/stepper';
import { ButtonComponent } from '../../components/atoms/Button/button.component';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CalendarModule,
    CommonModule,
    FontAwesomeModule,
    ModalComponent,
    ModalComponent,
    PanelModule,
    StepperModule,
    ButtonComponent,
    CalendarModule,
    ReactiveFormsModule,
    ToastModule,
    ImageModule,
    DatePipe,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  providers: [MessageService]
})
export class BookingComponent {
  faClock = faClock;
  faLocationDot = faLocationDot;
  isOpenModal = false;
  isVerifyDate = false;
  dateFull = new Date();
  loading: boolean = false;
  activeStep = 0;

  now = new Date();
  defaultDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 6, 0);
  minDate!: Date;
  maxDate!: Date;
  formGroup = new FormGroup({
    startDate: new FormControl<Date>(this.defaultDate, Validators.required),
  });

  constructor(
    private messageService: MessageService,
    private bookingService: BookingService,
  ) {}

  ngOnInit() {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 23, 59, 59, 999);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loading = true;
      const startDate = this.formGroup.value.startDate;

      if (startDate) {
        this.bookingService.verify({
          startDate,
        }).subscribe({
          next: (value) => {
            const isVerify = value.verify;
            const message = value.message;
            this.isVerifyDate = isVerify;
            this.dateFull = startDate;

            this.showVerify(isVerify, message);
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

  showVerify(isVerify: boolean, message: string) {
    this.messageService.add({
      severity: isVerify ? 'success' : 'error',
      summary: isVerify ? '¡Horario disponible!' : '¡Horario no disponible!',
      detail: message,
      closable: false,
      life: 5000,
    });
  }

  onDateSelect(event: any): void {
    this.isVerifyDate = false;
  }

  backToFirstStep() {
    this.isVerifyDate = false;
    this.activeStep = 0;
  }

  nextToSecondStep() {
    this.activeStep = 1;
  }

  resetBooking() {
    this.formGroup.setValue({
      startDate: this.defaultDate,
    });
    this.isVerifyDate = false
    this.activeStep = 0;
  }

  createBooking() {
    const startDate = this.formGroup.value.startDate;
    this.loading = true;

    if (startDate) {
      this.bookingService.create({
        startDate,
      }).subscribe({
        next: () => {
          this.loading = false;
          this.activeStep = 2;
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
    }
  }
}
