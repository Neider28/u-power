import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.css'
})
export class BookingModalComponent {

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService,
  ) {}

  date = input.required<Date>();
  @Output() isClose = new EventEmitter<boolean>();

  showConfirm = 0;

  hours = [
    {
      hour: '06:00',
      id: 1,
    },
    {
      hour: '07:00',
      id: 2,
    },
    {
      hour: '08:00',
      id: 3,
    },
    {
      hour: '09:00',
      id: 4,
    },
    {
      hour: '10:00',
      id: 5,
    },
    {
      hour: '11:00',
      id: 6,
    },
    {
      hour: '12:00',
      id: 7,
    },
    {
      hour: '13:00',
      id: 8,
    },
    {
      hour: '14:00',
      id: 9,
    },
    {
      hour: '15:00',
      id: 10,
    },
    {
      hour: '16:00',
      id: 11,
    },
    {
      hour: '17:00',
      id: 12,
    },
    {
      hour: '18:00',
      id: 13,
    },
    {
      hour: '19:00',
      id: 14,
    },
  ];

  onClickHour(id: number): void {
    this.showConfirm = id;
  }

  booking(id: number): void {
    const newStartDate = this.date();
    newStartDate.setHours(newStartDate.getHours() + (id + 5));

    this.bookingService.create({
      startDate: newStartDate,
    }).subscribe({
      next: () => {
        this.isClose.emit(false);
        this.toastr.success(
          'Tu cita para el gimnasio ha sido agendada exitosamente.',
          '¡Cita confirmada!',
          {
            timeOut: 3000,
          },
        );
      },
      error: () => {
        this.isClose.emit(false);
        this.toastr.error(
          'Lo sentimos, hubo un problema al intentar agendar tu cita.',
          '¡Error al agendar cita!',
          {
            timeOut: 3000,
          },
        );
      }
    });
  }
}
