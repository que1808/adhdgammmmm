import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Subtask {
  icon: string;
  title: string;
  duration: number;
  completed: boolean;
}

export interface Task {
  id: string;
  name: string;
  subtasks: Subtask[];
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  progress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly PREDEFINED_TASKS: Task[] = [
    {
      id: 'task-1',
      name: 'Morning Routine',
      priority: 'high',
      completed: false,
      subtasks: [
        { icon: '🌅', title: 'Wake up', duration: 5, completed: false },
        { icon: '🦷', title: 'Brush teeth', duration: 5, completed: false },
        { icon: '🚿', title: 'Take shower', duration: 15, completed: false }
      ]
    },
    {
      id: 'task-2',
      name: 'Medication',
      priority: 'high',
      completed: false,
      subtasks: [
        { icon: '💊', title: 'Take morning meds', duration: 5, completed: false }
      ]
    }
  ];

  private tasks = new BehaviorSubject<Task[]>([]);
  private predefinedTasks = new BehaviorSubject<Task[]>(this.PREDEFINED_TASKS);

  tasks$ = this.tasks.asObservable();
  predefinedTasks$ = this.predefinedTasks.asObservable();

  calculateDuration(subtasks: Subtask[]): number {
    return subtasks.reduce((total, subtask) => total + subtask.duration, 0);
  }

  calculateProgress(subtasks: Subtask[]): number {
    if (!subtasks.length) return 0;
    const completed = subtasks.filter(task => task.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  completeTask(taskId: string): void {
    // Update predefined tasks
    const updatedPredefined = this.predefinedTasks.getValue().map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    this.predefinedTasks.next(updatedPredefined);

    // Update user tasks
    const updatedTasks = this.tasks.getValue().map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    this.tasks.next(updatedTasks);
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      progress: this.calculateProgress(task.subtasks)
    };
    const currentTasks = this.tasks.getValue();
    this.tasks.next([...currentTasks, newTask]);
  }

  getOverallProgress(): number {
    const allTasks = [...this.predefinedTasks.getValue(), ...this.tasks.getValue()];
    if (!allTasks.length) return 0;
    
    const completed = allTasks.filter(task => task.completed).length;
    return Math.round((completed / allTasks.length) * 100);
  }

  updateTask(taskId: string, updates: Partial<Task>): void {
    // Update predefined tasks
    let updatedPredefined = this.predefinedTasks.getValue().map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    this.predefinedTasks.next(updatedPredefined);

    // Update user tasks
    let updatedTasks = this.tasks.getValue().map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    this.tasks.next(updatedTasks);
  }
}