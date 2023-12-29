import { Injectable } from '@angular/core';
import { HydrationService } from '../hydration-service/hydration.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Profile } from '../../data/Profile';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(
    private hydrationService: HydrationService,
    private localStorageService: LocalStorageService,
  ) {}

  getScore(): number {
    //first, get hydration data for today
    const hydrationData = this.hydrationService.getLastWeekHydrationData();
    const hydrationDataForToday = hydrationData.filter((entry) => {
      const today = new Date();
      return new Date(entry.date).getDate() === today.getDate();
    });

    const user: Profile | null = this.localStorageService.getProfile();
    if (!user) {
      return 0;
    }

    const dailyGoal = user.dailyGoal;

    const totalAmount = hydrationDataForToday.reduce(
      (total, entry) => total + entry.amountInMillilitres,
      0,
    );

    return (totalAmount / dailyGoal) * 100;
  }
}
