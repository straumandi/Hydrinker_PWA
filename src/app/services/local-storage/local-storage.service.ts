import { Injectable } from '@angular/core';
import { Settings } from '../../data/UserSettings';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveSettings(settings: Settings): void {
    this.setItem('settings', JSON.stringify(settings));
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
