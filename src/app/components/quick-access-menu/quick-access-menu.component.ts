import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-quick-access-menu',
  templateUrl: './quick-access-menu.component.html',
  styleUrls: ['./quick-access-menu.component.scss'],
  animations: [
    trigger('menuState', [
      state('closed', style({
        transform: 'translateY(20px)',
        opacity: 0,
        visibility: 'hidden'
      })),
      state('open', style({
        transform: 'translateY(0)',
        opacity: 1,
        visibility: 'visible'
      })),
      transition('closed => open', [
        animate('200ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('buttonRotate', [
      state('closed', style({ transform: 'rotate(0)' })),
      state('open', style({ transform: 'rotate(45deg)' })),
      transition('* => *', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class QuickAccessMenuComponent {
  isOpen = false;
  menuItems = [
    { icon: '➕', label: 'New Task', action: () => this.createNewTask() },
    { icon: '📊', label: 'Statistics', action: () => this.showStats() },
    { icon: '⚙️', label: 'Settings', action: () => this.openSettings() }
  ];

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  createNewTask(): void {
    // Implement task creation logic
  }

  showStats(): void {
    // Implement stats display logic
  }

  openSettings(): void {
    // Implement settings logic
  }
}