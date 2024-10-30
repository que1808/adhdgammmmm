import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserStats {
  level: number;
  xp: number;
}

@Injectable({
  providedIn: 'root'
})
export class XpService {
  private readonly LEVEL_THRESHOLD = 1000;
  private readonly XP_STORAGE_KEY = 'user_xp_stats';

  private userStats = new BehaviorSubject<UserStats>(this.loadStats());

  userStats$ = this.userStats.asObservable();

  constructor() {
    // Load saved stats on initialization
    this.loadStats();
  }

  private loadStats(): UserStats {
    const savedStats = localStorage.getItem(this.XP_STORAGE_KEY);
    return savedStats ? JSON.parse(savedStats) : { level: 1, xp: 0 };
  }

  private saveStats(stats: UserStats): void {
    localStorage.setItem(this.XP_STORAGE_KEY, JSON.stringify(stats));
  }

  addXp(amount: number): void {
    const currentStats = this.userStats.getValue();
    let newXp = currentStats.xp + amount;
    let newLevel = currentStats.level;

    while (newXp >= this.LEVEL_THRESHOLD) {
      newXp -= this.LEVEL_THRESHOLD;
      newLevel++;
      this.showLevelUpAnimation();
    }

    const newStats = { level: newLevel, xp: newXp };
    this.userStats.next(newStats);
    this.saveStats(newStats);
  }

  private showLevelUpAnimation(): void {
    // Create floating text effect
    const levelUpText = document.createElement('div');
    levelUpText.className = 'floating-xp';
    levelUpText.textContent = 'Level Up! 🎉';
    document.body.appendChild(levelUpText);

    // Remove after animation
    setTimeout(() => {
      levelUpText.remove();
    }, 1000);
  }
}