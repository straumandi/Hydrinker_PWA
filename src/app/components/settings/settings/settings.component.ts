import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { SnackbarService } from '../../../services/snackbar-service/snackbar.service';

// Import necessary modules from @angular/material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

// ... other necessary imports ...

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    // ...other imports...
    MatSlideToggleModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    // ...rest of the imports...
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit() {
    // Initialize form with default values or from local storage
    this.settingsForm = this.formBuilder.group({
      notifications: [false],
      email: ['', [Validators.required, Validators.email]],
      units: ['metric', Validators.required],
    });

    // Load settings if they exist
    const existingSettings = this.localStorageService.getSettings(); // Adjust method as needed
    if (existingSettings) {
      this.settingsForm.patchValue(existingSettings);
    }
  }

  saveSettings() {
    this.settingsForm.markAllAsTouched();
    if (this.settingsForm.valid) {
      this.localStorageService.saveSettings(this.settingsForm.value); // Adjust method as needed
      this.snackBarService.showMessage('Settings saved successfully');
    }
  }
}
