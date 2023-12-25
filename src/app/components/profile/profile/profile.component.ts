import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    const existingProfile = this.localStorageService.getProfile(); // Adjust the method to match your service
    this.profileForm = this.formBuilder.group({
      name: [existingProfile?.name || '', Validators.required],
      weight: [existingProfile?.weight || '', Validators.required],
      gender: [existingProfile?.gender || 'Male', Validators.required],
      dailyGoal: [existingProfile?.dailyGoal || '', Validators.required],
      age: [existingProfile?.age || '', Validators.required],
      drinkSize: [existingProfile?.drinkSize || '', Validators.required],
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.localStorageService.saveProfile(this.profileForm.value); // Adjust the method to match your service
    }
  }
}
