import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
