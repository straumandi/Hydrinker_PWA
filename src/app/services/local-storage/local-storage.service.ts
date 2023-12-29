import { Injectable } from '@angular/core';
import { Settings } from '../../data/UserSettings';
import { Profile } from '../../data/Profile';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveSettings(settings: Settings): void {
    this.setItem('settings', JSON.stringify(settings));
  }

  saveProfile(profile: Profile): void {
    this.setItem('profile', JSON.stringify(profile));
  }

  getProfile(): Profile | null {
    const profile = this.getItem('profile');
    if (profile) {
      return JSON.parse(profile);
    }
    return null;
  }

  getSettings(): Settings | null {
    const settings = this.getItem('settings');
    if (settings) {
      return JSON.parse(settings);
    }
    return null;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
