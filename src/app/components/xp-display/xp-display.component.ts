import { Component, OnInit } from '@angular/core';
import { XpService, UserStats } from '../../services/xp.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-xp-display',
  templateUrl: './xp-display.component.html',
  styleUrls: ['./xp-display.component.scss'],
  animations: [
    trigger('floatUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0)' }),
        animate('1000ms ease-out', style({ opacity: 0, transform: 'translateY(-50px) scale(1.5)' }))
      ])
    ])
  ]
})
export class XpDisplayComponent implements OnInit {
  stats$: Observable<UserStats>;
  showXpGain = false;
  xpGainAmount = 0;

  constructor(private xpService: XpService) {
    this.stats$ = this.xpService.userStats$;
  }

  ngOnInit(): void {
    // Subscribe to XP gains to show animation
    this.xpService.xpGain$.subscribe(amount => {
      if (amount > 0) {
        this.xpGainAmount = amount;
        this.showXpGain = true;
        setTimeout(() => this.showXpGain = false, 1000);
      }
    });
  }
}