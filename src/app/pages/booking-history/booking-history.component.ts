import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../../services/booking/booking.service';
import { Table, TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '../../components/atoms/Button/button.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { statusMap } from '../../constants';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [
    FontAwesomeModule,
    TableModule,
    ImageModule,
    ButtonComponent,
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
  ],
  providers: [MessageService],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent {
  constructor(
    private bookingService: BookingService,
    private messageService: MessageService,
  ) {}

  loading: boolean = false;

  now = new Date();
  defaultDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate(), 6, 0);

  formGroup = new FormGroup({
    startDate: new FormControl<Date>(this.defaultDate, Validators.required),
  });

  faClock = faClock;
  faTrash = faTrash;
  bookings: any[] = [];

  filterTable(dt2: Table, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    dt2.filterGlobal(inputElement.value, 'contains');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loading = true;
      const startDate = this.formGroup.value.startDate;

      if (startDate) {
        this.bookingService.history({
          startDate,
        }).subscribe({
          next: (value) => {
            this.bookings = value.map((item) => {
              console.log(item);
              return {
                name: item.user.name,
                picture: item.user.picture,
                email: item.user.email,
                id: item.user.googleId,
                idStudent: item.user.personalId,
                status: statusMap(item.status),
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
