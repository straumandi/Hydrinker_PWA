import { Injectable } from '@angular/core';
import { HydrationData } from '../../data/HydrationData';
import { SnackbarService } from '../snackbar-service/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class HydrationService {
  private localStorageKey = 'hydration_data';

  constructor(private snackbarService: SnackbarService) {}

  addDrink(drinkSize: number): void {
    const hydrationData: HydrationData = {
      date: new Date(),
      amountInMillilitres: drinkSize,
    };

    this.addDrinkToLocalStorage(hydrationData);

    this.snackbarService.showMessage(
      `${hydrationData.amountInMillilitres} ml was tracked!`,
    );
    console.log(`${hydrationData.amountInMillilitres} ml was tracked!`);
  }

  getLastWeekHydrationData(): HydrationData[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    const hydrationData = storedData ? JSON.parse(storedData) : [];

    return this.filterLastWeekData(hydrationData);
  }

  private filterLastWeekData(data: HydrationData[]): HydrationData[] {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return data.filter((entry) => new Date(entry.date) >= oneWeekAgo);
  }

  seedDataForPastWeek(): void {
    this.deleteAllHydrationData();

    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const randomDrinkSize = this.getRandomInt(200, 3000);
      const hydrationData: HydrationData = {
        date: date,
        amountInMillilitres: randomDrinkSize,
      };

      this.addDrinkToLocalStorage(hydrationData);
    }
  }

  private addDrinkToLocalStorage(hydrationData: HydrationData): void {
    const storedData = localStorage.getItem(this.localStorageKey);
    const data = storedData ? JSON.parse(storedData) : [];
    data.push(hydrationData);

    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private deleteAllHydrationData(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  getHydrationDataForDate(date: Date): HydrationData[] {
    const dayStart = this.getStartOfDay(date).getTime();
    const dayEnd = this.getEndOfDay(date).getTime();

    const storedData = localStorage.getItem(this.localStorageKey);
    const data = storedData ? JSON.parse(storedData) : [];
    return data.filter((entry: HydrationData) => {
      const entryTime = new Date(entry.date).getTime();
      return entryTime >= dayStart && entryTime <= dayEnd;
    });
  }

  private getStartOfDay(date: Date): Date {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

  private getEndOfDay(date: Date): Date {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }
}
