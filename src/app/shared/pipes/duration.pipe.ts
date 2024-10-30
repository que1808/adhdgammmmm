import { Pipe, PipeTransform } from '@angular/core';
import { Subtask } from '../../services/task.service';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(subtasks: Subtask[]): string {
    const totalMinutes = subtasks.reduce((total, subtask) => total + subtask.duration, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours === 0) {
      return `${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }
}