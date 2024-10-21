import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  faXmark = faXmark;

  @Input() visible: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  closing = false;

  close(): void {
    this.closing = true;

    setTimeout(() => {
      this.visible = false;
      this.onClose.emit();
      this.closing = false;
    }, 500);
  }
}
