import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HydrationService } from '../../../services/hydration-service/hydration.service';
import { DialogService } from '../../../services/dialog-service/dialog.service';
import { ScoreService } from '../../../services/score/score.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  drinkForm: FormGroup;
  score = 0;

  constructor(
    private formBuilder: FormBuilder,
    private hydrationService: HydrationService,
    private dialogService: DialogService,
    protected scoreService: ScoreService,
  ) {
    this.drinkForm = this.formBuilder.group({
      drinkSize: [0, Validators.required],
    });
    this.updateScore();
  }

  addDrink(): void {
    const drinkSize = +this.drinkForm.value.drinkSize;
    this.hydrationService.addDrink(drinkSize);
    this.drinkForm.reset();
    this.updateScore();
  }

  updateScore(): void {
    this.score = +this.scoreService.getScore().toFixed(0);
  }

  openDrinkSizeDialog() {
    this.dialogService.openDrinkSizeDialog().subscribe((result) => {
      if (result) {
        this.drinkForm.patchValue({ drinkSize: +result });
        this.addDrink();
      }
    });
  }
}
