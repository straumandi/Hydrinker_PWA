import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HydrationService } from '../../../services/hydration-service/hydration.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  drinkForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private hydrationService: HydrationService) {
    this.drinkForm = this.formBuilder.group({
      drinkSize: [0, Validators.required],
    });
  }

  addDrink(): void {
    const drinkSize = this.drinkForm.value.drinkSize;
    this.hydrationService.addDrink(drinkSize);
    this.drinkForm.reset();
  }
}