import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HydrationData } from '../../data/HydrationData';

@Injectable({
  providedIn: 'root',
})
export class HydrationService {
  private localStorageKey = 'hydration_data';

  constructor(private snackBar: MatSnackBar) {}

  addDrink(drinkSize: number): void {
    const hydrationData: HydrationData = {
      date: new Date(),
      amountInMillilitres: drinkSize,
    };

    const storedData = localStorage.getItem(this.localStorageKey);
    const data = storedData ? JSON.parse(storedData) : [];
    data.push(hydrationData);

    localStorage.setItem(this.localStorageKey, JSON.stringify(data));

    this.showSnackBar(`${hydrationData.amountInMillilitres} ml was tracked!`);
    console.log(`${hydrationData.amountInMillilitres} ml was tracked!`);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getLastWeekHydrationData(): Observable<HydrationData[]> {
    const storedData = localStorage.getItem(this.localStorageKey);
    const hydrationData = storedData ? JSON.parse(storedData) : [];

    const lastWeekData = this.filterLastWeekData(hydrationData);
    return of(lastWeekData);
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

  getHydrationDataForDate(date: Date): Observable<HydrationData[]> {
    const dayStart = this.getStartOfDay(date).getTime();
    const dayEnd = this.getEndOfDay(date).getTime();

    const storedData = localStorage.getItem(this.localStorageKey);
    const data = storedData ? JSON.parse(storedData) : [];
    const filteredData = data.filter((entry: HydrationData) => {
      const entryTime = new Date(entry.date).getTime();
      return entryTime >= dayStart && entryTime <= dayEnd;
    });

    return of(filteredData);
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
