import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SnackbarService } from '../../../services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit() {
    const existingProfile = this.localStorageService.getProfile(); // Adjust the method to match your service

    //Check for digits with regex
    this.profileForm = this.formBuilder.group({
      name: [existingProfile?.name || '', Validators.required],
      weight: [
        existingProfile?.weight || '',
        [Validators.required, this.numberValidator()],
      ],
      gender: [existingProfile?.gender || 'Male', Validators.required],
      dailyGoal: [
        existingProfile?.dailyGoal || '',
        [Validators.required, this.numberValidator()],
      ],
      age: [
        existingProfile?.age || '',
        Validators.required,
        this.numberValidator,
      ],
      drinkSize: [existingProfile?.drinkSize || '', this.numberValidator()],
    });
  }

  saveProfile() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      this.localStorageService.saveProfile(this.profileForm.value);
      this.snackBarService.showMessage('Profile saved successfully');
    }
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNotNumber = /[^0-9]+/.test(control.value);
      return isNotNumber ? { numberInvalid: true } : null;
    };
  }
}
