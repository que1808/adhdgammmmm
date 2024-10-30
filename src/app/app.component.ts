import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h1>ADHD Task Manager</h1>
      <div class="test-card">
        <p>If you see this card with styling, your SCSS is working!</p>
        <button class="test-button">Test Button</button>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      h1 {
        color: var(--text-secondary);
      }
    }
    
    .test-card {
      background-color: var(--card-bg);
      padding: 20px;
      border-radius: var(--radius-lg);
      margin-top: 20px;
      
      p {
        color: var(--text-primary);
      }
    }
    
    .test-button {
      margin-top: 10px;
      background-color: var(--accent-primary);
      &:hover {
        transform: translateY(-2px);
      }
    }
  `]
})
export class AppComponent {
  title = 'adhd-task-manager';
}