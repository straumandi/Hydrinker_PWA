import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HydrationService } from '../../../services/hydration-service/hydration.service';
import { DialogService } from '../../../services/dialog-service/dialog.service';
import { ScoreService } from '../../../services/score/score.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  score = 0;

  constructor(
    private hydrationService: HydrationService,
    private dialogService: DialogService,
    protected scoreService: ScoreService,
    private localStorageService: LocalStorageService,
  ) {
    this.updateScore();
  }

  addDrink(drinkSize: number): void {
    this.hydrationService.addDrink(drinkSize);
    this.updateScore();
  }

  updateScore(): void {
    this.score = +this.scoreService.getScore().toFixed(0);
  }

  openDrinkSizeDialog() {
    this.dialogService.openDrinkSizeDialog().subscribe((result) => {
      if (result) {
        this.addDrink(+result);
      }
    });
  }

  addDrinkFromForm() {
    const profile = this.localStorageService.getProfile();
    if (!profile) {
      return;
    }

    if (!profile.drinkSize) {
      this.openDrinkSizeDialog();
      return;
    }

    const drinkSize = +profile.drinkSize;
    this.addDrink(drinkSize);
  }
}
