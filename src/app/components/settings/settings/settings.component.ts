import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { Settings } from '../../../data/UserSettings';
import {HydrationService} from "../../../services/hydration-service/hydration.service";

@Component({
  selector: 'settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    public hydrationService: HydrationService,
  ) {}

  ngOnInit() {
    const existingSettings = this.localStorageService.getSettings();
    const { notifications, units, email } = existingSettings || {};
    this.settingsForm = this.formBuilder.group({
      notifications: [
        notifications ? notifications : true,
        Validators.required,
      ],
      units: [units ? units : 'Metric', Validators.required],
      email: [email ? email : '', Validators.email],
    });
  }

  saveUser() {
    if (this.settingsForm.valid) {
      const settings: Settings = this.settingsForm.value;
      console.log(settings);
      this.localStorageService.saveSettings(settings);
    }
  }
}
