import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ScoreComponent } from './components/score/score/score.component';
import { HistoryComponent } from './components/history/history/history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'score',
    component: ScoreComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
