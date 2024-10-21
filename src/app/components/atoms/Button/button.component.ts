import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonIconPosition } from '../../../types';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() iconPos: ButtonIconPosition = 'left';
  @Input() disabled: boolean = false;
  @Input() outlined: boolean = false;
  @Input() type: string = 'button';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() loading: boolean = false;
  @Input() pTooltip!: string;
  @Input() tooltipPosition!: "left" | "top" | "bottom" | "right";

  handleClick() {
    this.onClick.emit();
  }
}
