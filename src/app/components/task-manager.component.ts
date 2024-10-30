import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { XpService } from '../services/xp.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class TaskManagerComponent implements OnInit {
  tasks$: Observable<Task[]>;
  predefinedTasks$: Observable<Task[]>;
  activeTab: 'common' | 'custom' = 'common';
  currentTime = new Date();

  constructor(
    private taskService: TaskService,
    private xpService: XpService
  ) {
    this.tasks$ = this.taskService.tasks$;
    this.predefinedTasks$ = this.taskService.predefinedTasks$;
  }

  ngOnInit(): void {
    // Update time every minute
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  onTaskComplete(taskId: string): void {
    this.taskService.completeTask(taskId);
    this.xpService.addXp(50); // Base XP for completing a task
  }

  switchTab(tab: 'common' | 'custom'): void {
    this.activeTab = tab;
  }

  getOverallProgress(): number {
    return this.taskService.getOverallProgress();
  }
}