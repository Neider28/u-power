import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '../../components/atoms/Button/button.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { UserService } from '../../services/user/user.service';
import { UserI } from '../../interfaces/user';
import { DialogModule } from 'primeng/dialog';
import { BookingService } from '../../services/booking/booking.service';
import { BookingI } from '../../interfaces/booking';
import { statusMap } from '../../constants';

@Component({
  selector: 'app-students',
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
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    DialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  constructor(
    private userService: UserService,
    private bookingService: BookingService,
    private messageService: MessageService,
  ) {}

  faClock = faClock;
  faTrash = faTrash;
  students: any[] = [];
  student: any = {
    name: '',
    picture: '',
    email: '',
    id: '',
    idStudent: '',
    _id: '',
  };

  bookings: any[] = [];

  visible: boolean = false;

  showDialog(id: string) {
    this.student = this.students.find((item) => item._id === id);
    console.log(this.student);
    this.bookingService.historyByUser(id).subscribe({
      next: (value: BookingI[]) => {
        this.bookings = value.map((item: BookingI) => ({
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

    this.visible = true;
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.userService.getStudents().subscribe({
      next: (value) => {
        this.students = value.map((item: UserI) => ({
          name: item.name,
          picture: item.picture,
          email: item.email,
          id: item.googleId,
          idStudent: item.personalId,
          _id: item._id,
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

  filterTable(dt2: Table, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    dt2.filterGlobal(inputElement.value, 'contains');
  }

  attended(id: string) {
    console.log(id);
  }
}
