import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../../services/booking/booking.service';
import { BookingI } from '../../interfaces/booking';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { MessageService } from 'primeng/api';
import { statusMap } from '../../constants';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, DatePipe, TableModule, ImageModule, ToastModule],
  providers: [MessageService],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  constructor(
    private bookingService: BookingService,
    private messageService: MessageService,
  ) {}

  faClock = faClock;
  faCheckCircle = faCheckCircle;
  pendings: any[] = [];

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (value: BookingI[]) => {
        this.pendings = value.map((item: BookingI) => ({
          id: item._id,
          date: new Date(item.startDate),
          status: statusMap(item.status),
        }));
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
