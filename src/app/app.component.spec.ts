import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TaskManagerComponent } from './components/task-manager.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { XpDisplayComponent } from './components/xp-display/xp-display.component';
import { QuickAccessMenuComponent } from './components/quick-access-menu/quick-access-menu.component';

// Pipes
import { DurationPipe } from './shared/pipes/duration.pipe';

// Import the standalone AppComponent
import { AppComponent } from './app.component';

// Routes configuration
const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskManagerComponent },
  { path: '**', redirectTo: '/tasks' }
];

@NgModule({
  declarations: [
    // Do not declare AppComponent since it's standalone
    TaskManagerComponent,
    TaskCardComponent,
    XpDisplayComponent,
    QuickAccessMenuComponent,
    DurationPipe
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Router Configuration
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [],
  // Remove the bootstrap array since we're using a standalone component
})
export class AppModule { }