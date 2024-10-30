import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/task.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  animations: [
    trigger('cardState', [
      state('void', style({
        transform: 'translateY(20px)',
        opacity: 0
      })),
      transition('void => *', [
        animate('300ms ease-out')
      ]),
      state('completed', style({
        opacity: 0.6,
        transform: 'scale(0.98)'
      })),
      transition('* => completed', [
        animate('200ms ease-out')
      ]),
      trigger('ripple', [
        transition(':enter', [
          style({ transform: 'scale(0)', opacity: 1 }),
          animate('600ms ease-out', style({ transform: 'scale(2)', opacity: 0 }))
        ])
      ])
    ])
  ]
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskComplete = new EventEmitter<string>();

  rippleActive = false;
  ripplePosition = { x: 0, y: 0 };

  onComplete(event: Event): void {
    event.stopPropagation();
    this.taskComplete.emit(this.task.id);
  }

  createRipple(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.ripplePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    this.rippleActive = true;
    setTimeout(() => this.rippleActive = false, 600);
  }
}