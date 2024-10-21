import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../../services/booking/booking.service';
import { BookingI } from '../../interfaces/booking';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '../../components/atoms/Button/button.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pendings',
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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './pendings.component.html',
  styleUrl: './pendings.component.css'
})
export class PendingsComponent {
  constructor(
    private bookingService: BookingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  faClock = faClock;
  faTrash = faTrash;
  pendings: any[] = [];

  ngOnInit(): void {
    this.getPendings();
  }

  getPendings(): void {
    this.bookingService.getPendings().subscribe({
      next: (value: BookingI[]) => {
        this.pendings = value.map((item: BookingI) => ({
          id: item._id,
          date: new Date(item.startDate),
          attend: item.status === 'pending' ? 'Si' : 'No'
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

  cancelar(id: string) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas cancelar tu reserva?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      acceptLabel: 'Si',
      accept: () => {
        this.bookingService.cancel(id).subscribe({
          next: () => {
            this.getPendings();
            this.messageService.add({
              severity: 'success',
              summary: 'Reserva cancelada con éxito',
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
}
